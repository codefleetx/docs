#!/bin/bash

set -e

# -------------------------------
# INPUTS
# -------------------------------

ACTION="$1"
BASE_DIR="${2:-$(pwd)}"

# Default structure (can be overridden via env if needed)
JS_DIR="${JS_DIR:-assets/js}"
CSS_DIR="${CSS_DIR:-assets/css}"
JSON_DIR="${JSON_DIR:-assets/json}"
DIST_DIR="${DIST_DIR:-dist}"

SOURCE_JS="$BASE_DIR/$JS_DIR/*.js"
SOURCE_CSS="$BASE_DIR/$CSS_DIR/*.css"

DIST_JS="$BASE_DIR/$DIST_DIR/js/bundle.min.js"
DIST_CSS="$BASE_DIR/$DIST_DIR/css/bundle.min.css"

SEARCH_INDEX_SRC="$BASE_DIR/$JSON_DIR/search-index.json"
SEARCH_INDEX_DIST="$BASE_DIR/$DIST_DIR/json/search-index.pkg"

DOC_INDEX_SRC="$BASE_DIR/$JSON_DIR/docs-index.json"
DOC_INDEX_DIST="$BASE_DIR/$DIST_DIR/json/docs-index.pkg"

# -------------------------------
# VALIDATION
# -------------------------------

if [ ! -d "$BASE_DIR" ]; then
    echo "❌ Error: Repo path '$BASE_DIR' does not exist."
    exit 1
fi

command -v terser >/dev/null 2>&1 || { echo "❌ terser not installed"; exit 1; }
command -v cleancss >/dev/null 2>&1 || { echo "❌ cleancss not installed"; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo "❌ python3 not installed"; exit 1; }
command -v base64 >/dev/null 2>&1 || { echo "❌ base64 not installed"; exit 1; }

# -------------------------------
# PREPARE DIST
# -------------------------------

mkdir -p "$BASE_DIR/$DIST_DIR/js" "$BASE_DIR/$DIST_DIR/css"

# -------------------------------
# FUNCTIONS
# -------------------------------

minify_js() {
    echo "⚡ Minifying JavaScript in $BASE_DIR..."

    # 1. Expand the glob into a list
    FILES=$(ls $SOURCE_JS 2>/dev/null)

    if [ -n "$FILES" ]; then
        # 2. Separate files that "do things" (Entry points) from files that "define things" (Helpers)
        # Look for files containing 'window.addEventListener' or 'init' logic
        HELPERS=""
        ENTRIES=""

        for f in $FILES; do
            if grep -qE "addEventListener|initDocs|window\." "$f"; then
                ENTRIES="$ENTRIES $f"
            else
                HELPERS="$HELPERS $f"
            fi
        done

        # 3. Bundle Helpers first, then Entry points
        terser $HELPERS $ENTRIES -o "$DIST_JS" --mangle --compress
        echo "✅ JS → $DIST_JS (Auto-sorted dependencies)"
    else
        echo "⚠️ No JS files found"
    fi
}

minify_css() {
    echo "🎨 Minifying CSS in $BASE_DIR..."

    if ls $SOURCE_CSS >/dev/null 2>&1; then
        cleancss -o "$DIST_CSS" $SOURCE_CSS
        echo "✅ CSS → $DIST_CSS"
    else
        echo "⚠️ No CSS files found"
    fi
}

minify_content() {
    echo "📦 Packing JSON..."

    # -------------------------------
    # GENERATE SEARCH INDEX (ADDED)
    # -------------------------------
    if [ -f "$BASE_DIR/scripts/generate-search-index.py" ]; then
        echo "🔄 Generating search index..."
        python3 "$BASE_DIR/scripts/generate-search-index.py"
    else
        echo "⚠️ generate-search-index.py not found, skipping..."
    fi

    FOUND=false

    if [ -f "$BASE_DIR/$JSON_DIR/search-index.json" ]; then
        python3 -c "import json,sys; print(json.dumps(json.load(sys.stdin), separators=(',', ':')))" < "$BASE_DIR/$JSON_DIR/search-index.json" | base64 > "$SEARCH_INDEX_DIST"
        echo "✅ search-index.json → $SEARCH_INDEX_DIST"
        FOUND=true
    fi

    if [ -f "$BASE_DIR/$JSON_DIR/docs-index.json" ]; then
        python3 -c "import json,sys; print(json.dumps(json.load(sys.stdin), separators=(',', ':')))" < "$BASE_DIR/$JSON_DIR/docs-index.json" | base64 > "$DOC_INDEX_DIST"
        echo "✅ docs-index.json → $DOC_INDEX_DIST"
        FOUND=true
    fi

    if [ "$FOUND" = false ]; then
        echo "⚠️ No JSON files found"
    fi
}

clean_dist() {
    echo "🧹 Cleaning dist..."
    rm -rf "$BASE_DIR/$DIST_DIR"
    mkdir -p "$BASE_DIR/$DIST_DIR/js" "$BASE_DIR/$DIST_DIR/css" "$BASE_DIR/$DIST_DIR/json"
    cp -r "$BASE_DIR/assets/brand/" "$BASE_DIR/$DIST_DIR/brand/"
}

# -------------------------------
# EXECUTION
# -------------------------------

case "$ACTION" in
    js)
        minify_js
        ;;
    css)
        minify_css
        ;;
    content)
        minify_content
        ;;
    all)
        echo "🚀 Full build started in $BASE_DIR"
        clean_dist
        minify_js
        minify_css
        minify_content
        echo "✨ Build complete"
        ;;
    *)
        echo ""
        echo "Usage:"
        echo "  ./minify.sh {js|css|content|all} [repo_path]"
        echo ""
        exit 1
esac
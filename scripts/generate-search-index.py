# import os
# import json

# index = []

# for root, dirs, files in os.walk("."):
#     for file in files:
#         if file.endswith(".md"):
#             path = os.path.join(root, file).replace("\\", "/")
#             with open(path, "r", encoding="utf-8") as f:
#                 content = f.read()

#             title = content.split("\n")[0].replace("#", "").strip()

#             index.append({
#                 "file": path,
#                 "title": title,
#                 "content": content
#             })

# with open("assets/json/search-index.json", "w", encoding="utf-8") as f:
#     json.dump(index, f, indent=2)
    
    
import os
import json

DOCS_ROOT = "."
OUTPUT = "assets/json/search-index.json"


def extract_title(content, fallback):
    """Extract the first Markdown heading as title."""
    for line in content.splitlines():
        if line.startswith("#"):
            return line.replace("#", "").strip()
    return fallback


def build_search_index():
    index = []

    for root, dirs, files in os.walk(DOCS_ROOT):
        # Skip .history folders
        if ".history" in dirs:
            dirs.remove(".history")

        for file in files:
            if file.endswith(".md"):
                path = os.path.join(root, file)

                try:
                    with open(path, "r", encoding="utf-8") as f:
                        content = f.read()

                    title = extract_title(content, file.replace(".md", ""))

                    index.append({
                        "file": path.replace("\\", "/").lstrip("./"),
                        "title": title,
                        "content": content
                    })

                except Exception as e:
                    print(f"Error reading {path}: {e}")

    return index


def save_index(index):
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)

    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(index, f, indent=2, ensure_ascii=False)

    print(f"Search index generated: {OUTPUT}")


if __name__ == "__main__":
    search_index = build_search_index()
    save_index(search_index)
import styles from "./ProjectDescription.module.css";

type Block =
    | { type: "heading"; text: string }
    | { type: "paragraph"; text: string }
    | { type: "list"; items: string[] };

function parseDescription(raw: string): Block[] {
    const lines = raw.replace(/\r\n/g, "\n").split("\n");
    const blocks: Block[] = [];
    let listItems: string[] = [];
    let paragraph: string[] = [];

    const flushParagraph = () => {
        if (paragraph.length) {
            blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() });
            paragraph = [];
        }
    };

    const flushList = () => {
        if (listItems.length) {
            blocks.push({ type: "list", items: listItems });
            listItems = [];
        }
    };

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
            flushParagraph();
            flushList();
            continue;
        }

        if (trimmed.startsWith("## ")) {
            flushParagraph();
            flushList();
            blocks.push({ type: "heading", text: trimmed.slice(3).trim() });
            continue;
        }

        if (/^[-*•]\s+/.test(trimmed)) {
            flushParagraph();
            listItems.push(trimmed.replace(/^[-*•]\s+/, ""));
            continue;
        }

        flushList();
        paragraph.push(trimmed);
    }

    flushParagraph();
    flushList();
    return blocks;
}

export default function ProjectDescription({ content }: { content: string }) {
    const blocks = parseDescription(content);

    return (
        <div className={styles.description}>
            {blocks.map((block, i) => {
                if (block.type === "heading") {
                    return (
                        <h3 key={i} className={styles.heading}>
                            {block.text}
                        </h3>
                    );
                }
                if (block.type === "list") {
                    return (
                        <ul key={i} className={styles.list}>
                            {block.items.map((item, j) => (
                                <li key={j}>{item}</li>
                            ))}
                        </ul>
                    );
                }
                return (
                    <p key={i} className={styles.paragraph}>
                        {block.text}
                    </p>
                );
            })}
        </div>
    );
}

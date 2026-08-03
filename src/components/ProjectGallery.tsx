"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./ProjectGallery.module.css";

export default function ProjectGallery({
    images,
    title,
}: {
    images: string[];
    title: string;
}) {
    const media = images.filter(Boolean);
    const [active, setActive] = useState(0);
    const [lightbox, setLightbox] = useState(false);

    if (!media.length) return null;

    const isGif = (src: string) => src.toLowerCase().endsWith(".gif");

    const go = (dir: number) => {
        setActive((prev) => (prev + dir + media.length) % media.length);
    };

    return (
        <div className={styles.gallery}>
            <button
                type="button"
                className={styles.hero}
                onClick={() => setLightbox(true)}
                aria-label="Open gallery"
            >
                <Image
                    src={media[active]}
                    alt={`${title} screenshot ${active + 1}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 70vw"
                    className={styles.heroImage}
                    priority
                    unoptimized={isGif(media[active])}
                />
                <div className={styles.heroOverlay} />
                {media.length > 1 && (
                    <span className={styles.counter}>
                        {active + 1} / {media.length}
                    </span>
                )}
            </button>

            {media.length > 1 && (
                <div className={styles.thumbs} role="list">
                    {media.map((src, i) => (
                        <button
                            key={src + i}
                            type="button"
                            className={`${styles.thumb} ${i === active ? styles.thumbActive : ""}`}
                            onClick={() => setActive(i)}
                            aria-label={`Show image ${i + 1}`}
                        >
                            <Image
                                src={src}
                                alt=""
                                fill
                                sizes="120px"
                                className={styles.thumbImage}
                                unoptimized={isGif(src)}
                            />
                        </button>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        className={styles.lightbox}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(false)}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Image lightbox"
                    >
                        <button
                            type="button"
                            className={styles.close}
                            onClick={() => setLightbox(false)}
                            aria-label="Close"
                        >
                            <X size={22} />
                        </button>

                        {media.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    className={`${styles.navBtn} ${styles.prev}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        go(-1);
                                    }}
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={28} />
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.navBtn} ${styles.next}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        go(1);
                                    }}
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={28} />
                                </button>
                            </>
                        )}

                        <div
                            className={styles.lightboxInner}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={media[active]}
                                alt={`${title} full view ${active + 1}`}
                                width={1600}
                                height={900}
                                className={styles.lightboxImage}
                                unoptimized={isGif(media[active])}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

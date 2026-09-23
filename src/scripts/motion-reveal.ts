export interface RevealOnceOptions {
	/** Selector for individual items inside the container to stagger via CSS nth-child delays. Defaults to the container's direct children. */
	itemsSelector?: string;
	/** Reveal the container itself as a single unit instead of its children — for a section that should read as one composition. */
	asUnit?: boolean;
	threshold?: number;
	rootMargin?: string;
}

/**
 * Adds `motion-pre-reveal` to a container's items (or the container itself
 * with `asUnit: true`), then adds `is-revealed` to the container the first
 * time it enters the viewport. Reveal plays once — the observer disconnects
 * immediately after triggering, so scrolling back and forth never replays
 * it. No-ops (leaving content visible) when IntersectionObserver isn't
 * available.
 */
export function revealOnce(containerSelector: string, options: RevealOnceOptions = {}): void {
	const container = document.querySelector<HTMLElement>(containerSelector);
	if (!container || !("IntersectionObserver" in window)) return;

	const { itemsSelector, asUnit = false, threshold = 0.15, rootMargin = "0px 0px -60px 0px" } = options;
	const items = asUnit
		? [container]
		: itemsSelector
			? Array.from(container.querySelectorAll<HTMLElement>(itemsSelector))
			: (Array.from(container.children) as HTMLElement[]);
	items.forEach((item) => item.classList.add("motion-pre-reveal"));

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					container.classList.add("is-revealed");
					observer.disconnect();
					break;
				}
			}
		},
		{ threshold, rootMargin },
	);
	observer.observe(container);
}

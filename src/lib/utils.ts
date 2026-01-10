export function toNumber(value: string | number): number | undefined {
  if (value === null || value === undefined) return undefined
  const num = typeof value === 'number' ? value : parseFloat(String(value))
  return Number.isFinite(num) ? num : undefined
}

export function pickKey(source: Record<string, any>, key: string) {
  return source[key] ?? source[key.toLowerCase()] ?? source[key.replace(/_/g, '')]
}

type Size = { width: number; height: number }

export function observeElementSize(
  el: HTMLElement | null,
  onSize: (size: Size) => void
): () => void {
  if (!el) {
    return () => {};
  }

  if (typeof ResizeObserver === 'undefined') {
    const width = typeof window !== 'undefined' ? window.innerWidth : 0
    const height = typeof window !== 'undefined' ? window.innerHeight : 0
    onSize({ width, height })
    return () => {}
  }

  const observer = new ResizeObserver((entries) => {
    const entry = entries[0]
    if (entry) {
      const { width, height } = entry.contentRect
      onSize({ width, height })
    }
  })
  observer.observe(el)

  return () => observer.disconnect()
}
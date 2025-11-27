import { onMounted, onUnmounted, type Ref } from 'vue'

export function usePullToRefresh(elementRef: Ref<HTMLElement | null>) {
  let startY = 0
  let currentY = 0
  let isPulling = false
  const pullThreshold = 80 // Distance in pixels

  const handleTouchStart = (e: TouchEvent) => {
    const element = elementRef.value
    if (!element || !e.touches[0]) return

    if (element.scrollTop === 0) {
      startY = e.touches[0].clientY
      isPulling = true
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isPulling) return

    const element = elementRef.value
    if (!element || !e.touches[0]) return

    currentY = e.touches[0].clientY
    const pullDistance = currentY - startY

    if (pullDistance > 0 && element.scrollTop === 0) {
      e.preventDefault()

      element.style.transform = `translateY(${pullDistance * 0.5}px)`
      element.style.transition = 'none'
    }
  }

  const handleTouchEnd = () => {
    if (!isPulling) return

    const element = elementRef.value
    if (!element) return

    const pullDistance = currentY - startY

    // Reset transform with transition
    element.style.transition = 'transform 0.3s ease'
    element.style.transform = 'translateY(0)'

    if (pullDistance > pullThreshold) {
      setTimeout(() => {
        window.location.reload()
      }, 300)
    }

    isPulling = false
    startY = 0
    currentY = 0
  }

  onMounted(() => {
    const element = elementRef.value
    if (!element) return

    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })
  })

  onUnmounted(() => {
    const element = elementRef.value
    if (!element) return

    element.removeEventListener('touchstart', handleTouchStart)
    element.removeEventListener('touchmove', handleTouchMove)
    element.removeEventListener('touchend', handleTouchEnd)
  })
}

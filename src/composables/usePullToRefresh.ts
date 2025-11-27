import { onMounted, onUnmounted, type Ref } from 'vue'

export function usePullToRefresh(
  elementRef: Ref<HTMLElement | null>,
  indicatorRef: Ref<HTMLElement | null>,
) {
  let startY = 0
  let currentY = 0
  let isPulling = false
  const pullThreshold = 80 // Distance in pixels
  const maxPullDistance = window.innerHeight * 0.25 // 25vh

  const updateIndicator = (pullDistance: number) => {
    const indicator = indicatorRef.value
    if (!indicator) return

    if (pullDistance > 0) {
      const clampedDistance = Math.min(pullDistance, maxPullDistance)
      const progress = Math.min(clampedDistance / pullThreshold, 1)

      const rotationProgress = Math.min(pullDistance / maxPullDistance, 1)
      const easedProgress = 1 - Math.pow(1 - rotationProgress, 1.5)
      const rotation = easedProgress * 270

      indicator.style.opacity = String(progress)
      indicator.style.transform = `translateY(${clampedDistance * 0.5 - 40}px) rotate(${rotation}deg)`
    } else {
      indicator.style.opacity = '0'
    }
  }

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

      const clampedDistance = Math.min(pullDistance, maxPullDistance)
      element.style.transform = `translateY(${clampedDistance * 0.5}px)`
      element.style.transition = 'none'
      updateIndicator(pullDistance)
    }
  }

  const handleTouchEnd = () => {
    if (!isPulling) return

    const element = elementRef.value
    const indicator = indicatorRef.value
    if (!element) return

    const pullDistance = currentY - startY

    element.style.transition = 'transform 0.3s ease'
    element.style.transform = 'translateY(0)'

    if (indicator) {
      indicator.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
      indicator.style.opacity = '0'
      indicator.style.transform = 'translateY(-40px) rotate(0deg)'
    }

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

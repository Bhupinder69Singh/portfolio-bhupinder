import { journeyData } from "./journeyData";

export const JOURNEY_NODE_COUNT = journeyData.length;

/** How close (0–1 progress) you must be to a node before the info card appears */
export const NODE_SNAP_THRESHOLD = 0.065;

/** Viewport heights: one screen for the sticky scene + shorter travel between nodes */
export const JOURNEY_SCROLL_HEIGHT_VH =
  100 + (JOURNEY_NODE_COUNT - 1) * 50;

export function getNodeProgress(index: number): number {
  if (JOURNEY_NODE_COUNT <= 1) return 0;
  return index / (JOURNEY_NODE_COUNT - 1);
}

export type JourneyScrollState = {
  /** Continuous 0–1 for 3D camera / path */
  progress: number;
  /** Nearest node index when at a stop, otherwise -1 */
  snappedIndex: number;
  /** Show milestone card only when snapped to a node */
  showOverlay: boolean;
};

export function getJourneyScrollState(progress: number): JourneyScrollState {
  const clamped = Math.max(0, Math.min(1, progress));

  let snappedIndex = -1;
  let minDistance = Infinity;

  for (let i = 0; i < JOURNEY_NODE_COUNT; i++) {
    const nodeT = getNodeProgress(i);
    const distance = Math.abs(clamped - nodeT);
    if (distance < NODE_SNAP_THRESHOLD && distance < minDistance) {
      minDistance = distance;
      snappedIndex = i;
    }
  }

  return {
    progress: clamped,
    snappedIndex,
    showOverlay: snappedIndex >= 0,
  };
}

export function getScrollTopForNode(
  sectionEl: HTMLElement,
  index: number
): number {
  const t = getNodeProgress(index);
  const scrollable = sectionEl.offsetHeight - window.innerHeight;
  const sectionTop = sectionEl.offsetTop;
  return sectionTop + t * Math.max(0, scrollable);
}

/** Next node ahead of current scroll progress */
export function getNextNodeIndex(progress: number): number {
  for (let i = 0; i < JOURNEY_NODE_COUNT; i++) {
    if (getNodeProgress(i) > progress + NODE_SNAP_THRESHOLD) return i;
  }
  return JOURNEY_NODE_COUNT - 1;
}

/** Previous node behind current scroll progress */
export function getPrevNodeIndex(progress: number): number {
  for (let i = JOURNEY_NODE_COUNT - 1; i >= 0; i--) {
    if (getNodeProgress(i) < progress - NODE_SNAP_THRESHOLD) return i;
  }
  return 0;
}

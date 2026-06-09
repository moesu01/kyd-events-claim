import { DialRoot } from 'dialkit'
import { HOLO_DIALKIT_ENABLED } from '../../lib/holo-ticket-settings'
import '../../styles/claim-dev-controls.css'
import { ClaimDevControls } from './claim-dev-controls'

/** DialRoot portals to body; dev buttons sit in the gap to its left. */
const DIALKIT_COLLAPSED_SIZE_PX = 42
const DEV_DOCK_GAP_PX = 8
const DEV_DOCK_EDGE_PX = 16

export function HoloTicketDialRoot() {
  if (!import.meta.env.DEV) return null

  const dockRight = HOLO_DIALKIT_ENABLED
    ? DEV_DOCK_EDGE_PX + DIALKIT_COLLAPSED_SIZE_PX + DEV_DOCK_GAP_PX
    : DEV_DOCK_EDGE_PX

  return (
    <>
      <div
        className={HOLO_DIALKIT_ENABLED ? 'claim-dev-dock dialkit-root' : 'claim-dev-dock'}
        style={{ right: `${dockRight}px` }}
      >
        <ClaimDevControls />
      </div>
      {HOLO_DIALKIT_ENABLED ? <DialRoot position="bottom-right" defaultOpen={false} /> : null}
    </>
  )
}

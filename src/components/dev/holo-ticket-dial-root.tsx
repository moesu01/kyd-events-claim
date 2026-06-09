import { DialRoot } from 'dialkit'
import '../../styles/claim-dev-controls.css'
import { ClaimDevControls } from './claim-dev-controls'

/** DialRoot portals to body; dev buttons sit in the gap to its left. */
const DIALKIT_COLLAPSED_SIZE_PX = 42
const DEV_DOCK_GAP_PX = 8
const DEV_DOCK_EDGE_PX = 16

export function HoloTicketDialRoot() {
  if (!import.meta.env.DEV) return null

  return (
    <>
      <div
        className="claim-dev-dock dialkit-root"
        style={{
          right: `${DEV_DOCK_EDGE_PX + DIALKIT_COLLAPSED_SIZE_PX + DEV_DOCK_GAP_PX}px`,
        }}
      >
        <ClaimDevControls />
      </div>
      <DialRoot position="bottom-right" defaultOpen={false} />
    </>
  )
}

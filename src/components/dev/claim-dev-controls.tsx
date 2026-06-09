import { useClaimFlow } from '../../context/claim-flow-context'

function ResetFlowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M3.5 9a5.5 5.5 0 0 1 9.4-3.9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.5 4.5V1.5H11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 9a5.5 5.5 0 0 1-9.4 3.9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3.5 13.5v3H6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ReplayClaimIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M3.75 9a5.25 5.25 0 0 1 8.9-3.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12.65 3.5V1H15.15V3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.25 9a5.25 5.25 0 0 1-8.9 3.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5.35 14.5V17H2.85V14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ClaimDevControls() {
  const { claimStatus, requestClaimFlowReset, requestClaimAnimationReplay } = useClaimFlow()
  const isClaimed = claimStatus === 'claimed'

  return (
    <>
      <button
        type="button"
        className="claim-dev-control"
        aria-label="Reset claim flow to step 1"
        title="Reset claim flow"
        onClick={requestClaimFlowReset}
      >
        <ResetFlowIcon />
      </button>

      <button
        type="button"
        className="claim-dev-control claim-dev-control--replay"
        aria-label="Replay successful claim animation"
        title="Replay claim animation"
        disabled={!isClaimed}
        onClick={requestClaimAnimationReplay}
      >
        <ReplayClaimIcon />
      </button>
    </>
  )
}

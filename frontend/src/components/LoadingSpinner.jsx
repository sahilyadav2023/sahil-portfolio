// Shown by React Suspense while lazy-loaded sections are being fetched
export default function LoadingSpinner() {
  return (
    <div className="spinner-wrapper">
      <div className="spinner" aria-label="Loading..." />
    </div>
  );
}

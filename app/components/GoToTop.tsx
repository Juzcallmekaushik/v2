

export default function GoToTop() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ position: "fixed", right: 16, bottom: 16, zIndex: 1000 }}>
      <button
        aria-label="Go to top"
        onClick={handleClick}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5 5",
          width: "30px",
          height: "30px",
          background: "#151515",
          color: "#fff",
          fontWeight: 700,
          fontSize: 16,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          cursor: "pointer",
          textDecoration: "none",
          transition: "background 0.15s, color 0.15s",
          
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 transition-colors hover:text-green-400" viewBox="0 0 24 24" fill="currentColor" width={16} height={16} style={{ marginRight: 0 }}>
          <path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path>
        </svg>
      </button>
    </div>
  );
}
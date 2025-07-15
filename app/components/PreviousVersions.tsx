
export default function PreviousVersions() {
  return (
    <div style={{ position: "fixed", left: 16, bottom: 16, zIndex: 1000 }}>
    <a
        href="https://v1.kaushikreddy.me"
        target="_blank"
        rel="noopener noreferrer"
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
            gap: 8,
        }}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-400 transition-colors hover:text-green-400"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-label="Previous version"
            width={16}
            height={16}
        >
            <title>Previous version</title>
            <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.53614 4 7.33243 5.11383 5.86492 6.86543L8 9H2V3L4.44656 5.44648C6.28002 3.33509 8.9841 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path>
        </svg>
    </a>
    </div>
  );
}
function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon = null,
  className = "",
}) {
  const baseStyles = `
    relative overflow-hidden
    font-semibold rounded-full
    transition-all duration-300 ease-out
    transform hover:scale-105 hover:-translate-y-1
    active:scale-95 active:translate-y-0
    focus:outline-none focus:ring-4 focus:ring-opacity-50
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    group
    shadow-lg hover:shadow-xl
    before:absolute before:inset-0 before:bg-white before:opacity-0 
    before:transition-opacity before:duration-300
    hover:before:opacity-10
    after:absolute after:inset-0 after:rounded-full
    after:bg-gradient-to-r after:opacity-0 after:transition-opacity after:duration-300
  `;

  const sizes = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
    xl: "py-5 px-10 text-xl",
  };

  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 to-purple-600
      text-white 
      hover:from-blue-700 hover:to-purple-700
      focus:ring-blue-500
      after:from-blue-400 after:to-purple-400
      hover:after:opacity-20
      shadow-blue-500/25 hover:shadow-blue-500/40
    `,
    secondary: `
      bg-gradient-to-r from-gray-600 to-gray-700
      text-white 
      hover:from-gray-700 hover:to-gray-800
      focus:ring-gray-500
      after:from-gray-400 after:to-gray-500
      hover:after:opacity-20
      shadow-gray-500/25 hover:shadow-gray-500/40
    `,
    muted: `
      bg-gradient-to-r from-gray-100 to-gray-200
      text-gray-700 border border-gray-300
      hover:from-gray-200 hover:to-gray-300
      focus:ring-gray-400
      after:from-gray-50 after:to-gray-100
      hover:after:opacity-50
      shadow-gray-400/25 hover:shadow-gray-400/40
    `,
    outline: `
      bg-transparent border-2 border-blue-500
      text-blue-600 
      hover:bg-blue-50 hover:border-blue-600
      focus:ring-blue-500
      after:from-blue-50 after:to-blue-100
      hover:after:opacity-50
      shadow-blue-500/25 hover:shadow-blue-500/40
    `,
    success: `
      bg-gradient-to-r from-green-500 to-emerald-600
      text-white 
      hover:from-green-600 hover:to-emerald-700
      focus:ring-green-500
      after:from-green-400 after:to-emerald-400
      hover:after:opacity-20
      shadow-green-500/25 hover:shadow-green-500/40
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-pink-600
      text-white 
      hover:from-red-600 hover:to-pink-700
      focus:ring-red-500
      after:from-red-400 after:to-pink-400
      hover:after:opacity-20
      shadow-red-500/25 hover:shadow-red-500/40
    `,
  };

  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const buttonContent = (
    <>
      {loading && <LoadingSpinner />}
      <span
        className={`flex items-center justify-center gap-2 transition-opacity duration-200 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {icon && (
          <span className="transition-transform duration-300 group-hover:scale-110">
            {icon}
          </span>
        )}
        {children}
      </span>

      {/* Effet de ripple au clic */}
      <span className="absolute inset-0 rounded-full opacity-0 group-active:opacity-100 group-active:animate-ping bg-white/20" />
    </>
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles} 
        ${sizes[size]} 
        ${variants[variant]}
        ${className}
      `}
      style={{
        background: disabled
          ? undefined
          : variants[variant].includes("gradient")
          ? undefined
          : variants[variant],
      }}
    >
      {buttonContent}
    </button>
  );
}

export default Button;

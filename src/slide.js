const Slide = ({ children, style, className = "" }) => (
    <div className={`xD ${className}`} style={style}>
      {children}
    </div>
  );
  
  export default Slide;
  
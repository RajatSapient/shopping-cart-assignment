import { useState } from "react";

export const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
  return (
          <p className="text">
            {isReadMore ? text.slice(0, 80) : text}
            <button onClick={toggleReadMore} className="read-or-hide" style={{textTransform:"capitalize",cursor:"pointer",background:"transparent",border:"0"}}>
              {isReadMore ? "...read more" : " show less"}
            </button>
          </p>
        );
    
}

import * as React from "react"

const Message = ({ color, text, image }) => {
  return (
    <div
      className={`py-3 px-5 flex justify-center items-center text-white`}
      style={{ background: `${color}` }}
    >
      {image && <img src={image} alt={text} />}
      {text}
    </div>
  )
}

Message.defaultProps = {
  color: "#2a6f97",
}

export default Message

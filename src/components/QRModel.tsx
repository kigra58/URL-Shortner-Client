import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

interface IProps {
  url: string;
}

const QRModel: React.FC<IProps> = ({ url }) => {
  const [QRImg, setQRIMG] = useState("");

  /**
   * GENERATE QR CODE
   */
  const generateQR = (text: string) => {
    if (text !== "") {
      QRCode.toDataURL(text)
        .then((val) => setQRIMG(val))
        .catch((err) => console.error(err));
    }
  };
  /**
   * DOWNLOAD QR CODE
   */
  const downloadIMG = () => {
    const linkSource = QRImg;
    const downloadLink = document.createElement("a");
    const fileName = "shorturl.png";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  useEffect(() => {
    generateQR(url);
  }, [url]);

  return (
    <div className="card border-light mb-3">
      {/* <div className="card-header">Header</div> */}
      <div className="card-body">
        {/* SHOW QR  */}
        {QRImg !== "" && <img src={QRImg} alt="" />}
        <i
          className="bi bi-download fs-3"
          onClick={downloadIMG}
          title="short agin"
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default QRModel;

import React, { useState } from "react";
import Axios from "axios";
import QRModel from "./QRModel";

const API_URL = "http://localhost:3021/url/create";
const BASE_URL = "http://localhost:3021/url/";
const myURL = "http://localhost:3021/url/";

const UrlShotner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [field, setField] = useState({
    longURL: "",
    shortId: "",
  });

  /**
   *  GENERATE NEW URL
   */
  const onSubmit = async () => {
    try {
      if (field && field.longURL !== "") {
        setLoading(true);
        const { data } = await Axios.post(API_URL, {
          url: field.longURL,
        });
        if (data && data.success) {
          setField({ ...field, shortId: data.shortId });
        }
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const visitHandler = () => {
    Axios.get(BASE_URL.concat(field.shortId)).then(() => {
      window.open(myURL.concat(field.shortId));
    });
  };

  return (
    <div className="col-6 shadow mx-auto mt-5 ">
      <div className="card text-dark bg-light mb-3">
        <div className="card-header">
          <h5>URL Shortner</h5>
        </div>
        <div className="card-body">
          {/* <h5 className="card-title">Light card title</h5> */}
          <div className="p-5 col-sm-11">
            <input
              type="text"
              className="form-control my-3"
              placeholder="Enter long URL"
              value={field.longURL}
              onChange={(e) => setField({ ...field, longURL: e.target.value })}
            />
            {field && field.shortId != "" && (
              <input
                type="text"
                className="form-control my-3"
                value={myURL.concat(field.shortId)}
              />
            )}

            {/* ONSUBMIT  */}
            <button
              className="btn btn-sm btn-outline-dark"
              disabled={loading}
              onClick={onSubmit}
              type="button"
            >
              Short URL
              {loading && (
                <div className="spinner-border  text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </button>

            {/* COPY URL  */}
            {field && field.shortId != "" && (
              <i
                className="bi bi-clipboard fs-4 mx-3"
                style={{ cursor: "pointer" }}
                title="copy short URL"
                onClick={() => {
                  navigator.clipboard.writeText(myURL.concat(field.shortId));
                  alert("copied :" + myURL.concat(field.shortId));
                }}
              />
            )}
            {/* QR GENERATE  */}
            {field && field.shortId !== "" && (
              <i
                title="generate QR"
                style={{ cursor: "pointer" }}
                className="bi bi-qr-code fs-4 mx-2"
                onClick={() => setShowQR(true)}
              />
            )}

            {/* VISIT URL  */}
            {field && field.shortId != "" && (
              <i
                title="visit URL"
                className="bi bi-arrow-90deg-right fs-4 mx-2"
                style={{ cursor: "pointer" }}
                onClick={() => visitHandler()}
              />
            )}

            {/* SHORT AGAIN  */}
            {field && field.shortId != "" && (
              <i
                className="bi bi-arrow-clockwise fs-4 mx-2"
                title="short agin"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setField({ shortId: "", longURL: "" });
                }}
              />
            )}
          </div>
        </div>
      </div>
      {showQR && field.shortId !== "" && (
        <QRModel url={myURL.concat(field.shortId)} />
      )}
    </div>
  );
};

export default UrlShotner;

import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import { fetchPhotoList } from "../../services/photoListService";
import { isApiSuccess, getErrMsg } from "../../utils/serviceUtils";

import "./index.css";

type FormData = {
  values: {
    firstName: string;
    lastName: string;
  };
};

interface ImageResponse {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const DATA_PER_PAGE: number = 10;
const PhotoListComponent: React.FC = () => {
  const location = useLocation();
  const {
    values: { firstName = "", lastName = "" },
  } = location?.state as FormData;

  const [masterList, setMasterList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);

  const getPhotoList = async () => {
    try {
      setLoading(true);
      const { res, err } = await fetchPhotoList();

      if (err) {
        const errorMsg = err && getErrMsg(err);
        setLoading(false);
        throw new Error(errorMsg);
      }

      if (isApiSuccess(res)) {
        const responseData = res?.data;
        const totalPages =
          (responseData?.length % DATA_PER_PAGE === 0)
            ? (responseData?.length / DATA_PER_PAGE)
            : (parseInt((responseData?.length / DATA_PER_PAGE).toString()) + 1);

            console.log(totalPages, responseData?.length)
        const filteredList = getPaginatedData(responseData, 0, DATA_PER_PAGE);

        setMasterList(responseData);
        setImageList(filteredList);
        setTotalPages(totalPages);
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getPaginatedData = (
    array: any,
    startIndex: number,
    lastIndex: number
  ) => {
    return array.filter(
      (_: any, index: number) => index >= startIndex && index < lastIndex
    );
  };

  useEffect(() => {
    getPhotoList();
  }, []);

  useEffect(() => {
    const lowerIndex = (selectedPage - 1) * DATA_PER_PAGE;
    const upperIndex = selectedPage * DATA_PER_PAGE;
    const filteredList = getPaginatedData(masterList, lowerIndex, upperIndex);
    setImageList(filteredList);
  }, [selectedPage]);

  if (loading) {
    return (
      <div className="loader-component">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }
  return (
    <div className="photolist-container">
      <header className="page-title">{`Welcome ${firstName} ${lastName}`}</header>
      <div className="image-container">
        <div className="sub-title">Image List Page</div>

        <ul className="image-list">
          {imageList &&
            imageList.length > 0 &&
            imageList.map((item: ImageResponse) => (
              <li key={item.id} className="image-list-item">
                <span className="image-title">{item.title}</span>
                <img
                  className="image"
                  src={item.thumbnailUrl}
                  alt={item.thumbnailUrl}
                />
              </li>
            ))}
        </ul>
      </div>
      <div className="page navigation">
        <div className="page-size">Data Per Page: {DATA_PER_PAGE}</div>
        <div className="navigation-section">
          <div className={`page-item ${selectedPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="javscript:void(0)"
              aria-label="Previous"
              role="button"
              onClick={() =>  setSelectedPage(selectedPage - 1 > 0 ? selectedPage - 1 : 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </div>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                className={`page-item ${
                  index + 1 === selectedPage ? "active" : ""
                }`}
                aria-current="page"
                key={index+1}
              >
                <a
                  className="page-link"
                  href="javscript:void(0)"
                  role="button"
                  onClick={() => setSelectedPage(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            ))}
          </ul>
          <div
            className={`page-item ${
              selectedPage === totalPages ? "disabled" : ""
            }`}
          >
            <a
              className="page-link"
              href="javscript:void(0)"
              aria-label="Next"
              role="button"
              onClick={() => setSelectedPage(
                selectedPage + 1 <= totalPages ? selectedPage + 1 : totalPages
              )}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoListComponent;

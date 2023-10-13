import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPhotos } from "../api";
import { addImages } from '../reducers/app';

const List = () => {
  const [data, setData] = useState({
    status: "init",
    error: "",
    page: 1,
  });
  const images = useSelector((state) => state.app.list);
  const dispatch = useDispatch();

  useEffect(() => {
    setData({
      ...data,
      status: "loading",
    })
    fetchPhotos({
      perPage: 30,
      page: data.page,
    }).then((result) => {
      if (result.images) {
        setData({
          ...data,
          status: "finished",
          error: '',
        });
        dispatch(addImages(result.images));
      } else throw new Error("Incorrect response")
    }).catch(error => setData({
      ...data,
      status: "error",
      error,
    }));
  }, [data.page]);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && data.status === 'finished') {
      setData({
        ...data,
        page: data.page + 1,
      });
    };
  };

  if (data.status === "finished" || data.status === "loading") {
    return (
      <div 
        style={{
          minHeight: "90vh",
          maxHeight: "90vh",
          width: "100%",
          overflowY: "scroll",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "10px",
          justifyItems: 'center',
          alignItems: "center",
          textAlign: 'center',
        }}
        onScroll={handleScroll}>
        {images.map(image => (
            <div key={image.id}>
              <img src={image.urls.thumb} alt={image.alt_description} />
              {image.user.username}
            </div>
          )
        )}
        {data.status === "loading" && <div>Loading data...</div>}
      </div>
    );
  }

  if (data.status === "error") {
    return (
      <div style={{ minHeight: "90vh", width: "100%" }}>
        An error has occurred: {data.error}
      </div>
    );
  }

  return (
    <div style={{ minHeight: "90vh", width: "100%" }}>
      Loading data...
    </div>
  );
};

export default List;

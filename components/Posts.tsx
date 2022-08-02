import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { dummyData } from '../utilities/dummyData';

type Album = {
  userId: number;
  id: number;
  title: string;
};

type Photos = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export default function Posts() {
  const [userId, setUserId] = useState('');
  const [albumIds, setAlbumIds] = useState<Number[]>([]);
  const [photos, setPhotos] = useState<Photos[] | null>(null);
  const [searchDisable, setSearchDisable] = useState<boolean>(true);

  useEffect(() => {
    async function fetchAlbums() {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/albums'
      );
      const data = await response.json();
      let albumsValue = data.filter(
        (album: Album) => album.userId.toString() === userId
      );
      let albumsIdValue: Number[] = [];
      if (albumsValue) {
        albumsValue.forEach((element: Album) => {
          albumsIdValue.push(element.id);
        });
        setAlbumIds(albumsIdValue);
      }
    }
    fetchAlbums();
    userId !== '' && setSearchDisable(false);
  }, [userId]);

  const updateUser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDisable(true);
    setUserId(e.target.value);
  };

  const findPhotos = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    let data: Photos[] = await response.json();
    //We are displaying only first 2000 records
    data = data.slice(0, 2000).filter((photo: Photos) => {
      return albumIds?.indexOf(photo.albumId) !== -1;
    });
    setPhotos(data?.slice(0, 10));
  };

  return (
    <>
      <div className="profile_container">
        <label id="userid">User id</label>
        <input
          aria-labelledby="id"
          name="userId"
          type="number"
          value={userId}
          onChange={updateUser}
          placeholder="Enter user id"
        />
        <button disabled={searchDisable} onClick={findPhotos}>
          Search
        </button>
      </div>
      <div className="photo_album">
        {photos ? (
          photos.length > 0 ? (
            photos.map((photo, index) => {
                console.log(dummyData[index])

              return (
                <>
                  <div className="photo_album_content">
                    <Image
                      layout="fixed"
                      width={100}
                      height={100}
                      src={dummyData[index]}
                      alt={photo.thumbnailUrl}
                    />
                    <div className="photo_album_heading">
                      <h3>{`Album id : ${photo.albumId}`}</h3>
                      <h3>{`Title : ${photo.title}`}</h3>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <h1>No Records Found !</h1>
          )
        ) : null}
      </div>
    </>
  );
}
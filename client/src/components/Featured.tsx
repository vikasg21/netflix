import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import React from "react";
import { MovieItem } from "./MovieItem";
import { Link } from "react-router-dom";
import Preview, { useVideo } from "./Preview";
type FeaturedProps = {
  type?: string;
};

export default function Featured({ type }: FeaturedProps) {
  const [item, setItem] = React.useState<MovieItem | null>(null);
  const [video] = useVideo({ id: item?.id, type: item?.media_type });
  React.useEffect(() => {
    const getRandomItem = async () => {
      try {
        const res = await axios.get(`movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDNlMmExYzlhOGY1NGEyMGY3ODhmNyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDQ0Nzk5NDIsImV4cCI6MTY0NTA4NDc0Mn0._u8DIAdo33cWaUVEgtrUL2lGtGT4EOLFOFCBK4m7_sk",
          },
        });
        console.log({ getRandomItem: res.data });
        setItem(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomItem();
  }, [type]);

  const baseUrl: string = "https://image.tmdb.org/t/p/original";
  const bgPoster: string = `${baseUrl + item?.backdrop_path}`;

  console.log({ bgPoster });

  return (
    <div className="featured relative h-[56.25vw] w-full">
      {type && (
        <div className="category absolute top-20 left-12 flex items-center text-3xl font-medium text-white ">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            className="m-5 cursor-pointer border border-white bg-black p-1"
            name="genre"
            id="genre"
          >
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
          </select>
        </div>
      )}

      <img
        className="poster-image absolute top-0 left-0 h-full  w-full"
        src={`${bgPoster}`}
        alt="movie poster"
      />
      <div className="wrapper absolute inset-0 overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${video?.key}?autoplay=1&mute=1&loop=1&controls=0&start=15&playlist=${video?.key}`}
          title={video?.name}
          className=" pointer-events-none absolute left-0 top-0 h-full w-full scale-150 border-2 border-orange-500 "
        />
        <div className="fade-to-netflix-bg from-netflix-black absolute bottom-0 z-[11] h-[15%] w-full  bg-opacity-0 bg-gradient-to-t md:h-[30%] "></div>
      </div>
      <div className="info-wrapper absolute z-10 h-full w-full bg-gradient-to-r from-black">
        <div className="info xsm:bottom-[30%] xsm:w-[36%] absolute left-[4%] top-16 flex w-[50%] flex-col justify-end text-white sm:bottom-[25%]  md:bottom-[30%] lg:bottom-[35%]">
          <span
            style={{
              transformOrigin: "left bottom",
              transform: "scale(1) translate3d(0px, 0px, 0px)",
              transitionDuration: "1300ms",
              transitionDelay: "0ms",
            }}
            className="text-left text-[5vw] leading-none"
          >
            {item?.title}
          </span>
          <span className="description my-[1.5vw] text-[1.5vw]">
            {item?.overview?.substring(0, 100) + "..."}
          </span>
          <div className="buttons mt-[1.5vw] flex items-center justify-start text-black">
            <Link to="/watch">
              <button className="play mr-2.5 flex cursor-pointer items-center justify-around rounded border-none bg-white px-2.5  text-[1.75vw]">
                <PlayArrow />
                <span>&nbsp; Play</span>
              </button>
            </Link>
            <button className="more mr-2.5 flex cursor-pointer items-center justify-around rounded border-none bg-gray-600 px-2.5 text-[1.75vw] text-white">
              <InfoOutlined />
              <span> &nbsp; More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

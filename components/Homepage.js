import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "next/image";
import { HomepageFooter } from "./HomepageFooter";
import { BsPersonPlus } from "react-icons/bs";
import { GiBattleAxe, GiTrophyCup } from "react-icons/gi";
import { Navigation, HashNavigation } from "swiper";
import { AiOutlineRight } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import coin from "../assets/img/coin.svg";
import card1 from "../assets/img/new1.svg";
import card2 from "../assets/img/new2.svg";
import card3 from "../assets/img/new3.svg";
import card4 from "../assets/img/new4.svg";
import card5 from "../assets/img/new5.svg";
import card6 from "../assets/img/new6.svg";
import background from "../assets/img/background1.svg";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Features from "./homepage/Features";

import Highlights from "./homepage/Highlights";
const Homepage = () => {
  const [activeslide, setactiveslide] = useState(0);
  const [logged, setLogged] = useState(false);
  const [haveteam, sethaveteam] = useState(true);
  const [isMobile, setisMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const swiperRef = useRef(null);
  const [formdata, setformdata] = useState({
    company: "",
    firstname: "",
    lastname: "",
    eventname: "",
    email: "",
    phone: "",
    eventdetails: "",
    startdate: "",
    enddate: "",
    address: "",
    city: "",
    pincode: "",
    registered: false,
    cin: "",
    registrationnumber: "",
    website: "",
    companycard: "",
    contractletter: "",
    ndaform: "",
    matches: "",
  });
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const carousalheader = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];
  SwiperCore.use([EffectCoverflow, Pagination, Autoplay]);
  const toSlide = (num) => {
    console.log("go to slide", num);
    swiperRef.current?.swiper.slideTo(num);
  };
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1025 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 769 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 768, min: 427 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 426, min: 0 },
      items: 2,
    },
    smallmobile: {
      breakpoint: { max: 350, min: 0 },
      items: 1,
    },
  };
  useEffect(() => {
    AOS.init({
      duration: 1500,
      offset: 120,
    });
  });
  useEffect(() => {
    if (window.innerWidth < 600) {
      setisMobile(true);
    }
    const media = window.matchMedia(`(max-width: 500px)`);
    media.addEventListener("change", (e) => {
      if (e.matches) {
        setisMobile(true);
      } else {
        setisMobile(false);
      }
    });
    return () => media.removeEventListener("change", (e) => updateTarget(e));
  }, []);
  useEffect(() => {
    const accessToken = localStorage.getItem("authUser");
    if (!accessToken) {
      setLogged(false);
    } else {
      setLogged(true);
      // if (JSON.parse(accessToken).user.teams.length == 0) {
      //   sethaveteam(false);
      // }
    }
  }, []);

  const submitform = () => {
    console.log("formdata", formdata);
  };

  return (
    <div className={styles.homepage}>
      <Dialog open={open} button={"submit"}>
        <DialogTitle>
          <p className={styles.applyorghead}>Apply for Event Organising</p>
        </DialogTitle>
        <DialogContent>
          <div className={styles.applyorg}>
            <form onSubmit={() => submitform()}>
              <TextField
                margin="dense"
                label="Name of Company"
                fullWidth
                variant="standard"
                autoComplete="off"
                onChange={(e) =>
                  setformdata({ ...formdata, company: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="First Name"
                fullWidth
                variant="standard"
                autoComplete="off"
                onChange={(e) =>
                  setformdata({ ...formdata, firstname: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Last Name"
                fullWidth
                variant="standard"
                autoComplete="off"
                onChange={(e) =>
                  setformdata({ ...formdata, lastname: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Event Name"
                fullWidth
                variant="standard"
                autoComplete="off"
                onChange={(e) =>
                  setformdata({ ...formdata, eventname: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                variant="standard"
                autoComplete="off"
                onChange={(e) =>
                  setformdata({ ...formdata, email: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Phone"
                fullWidth
                type="number"
                variant="standard"
                autoComplete="off"
                onChange={(e) =>
                  setformdata({ ...formdata, phone: e.target.value })
                }
              />
              <h5 className={styles.applyorgtext}>Event Details</h5>
              <textarea
                onChange={(e) =>
                  setformdata({ ...formdata, eventdetails: e.target.value })
                }
              />
              <br />
              <div style={{ marginTop: "1rem" }}>
                <label htmlFor="startdate">Start Date</label>
                <input
                  type="date"
                  id="startdate"
                  onChange={(e) =>
                    setformdata({ ...formdata, startdate: e.target.value })
                  }
                />
              </div>
              <div style={{ marginTop: "1rem" }}>
                <label htmlFor="enddate">End Date</label>
                <input
                  type="date"
                  id="enddate"
                  onChange={(e) =>
                    setformdata({ ...formdata, enddate: e.target.value })
                  }
                />
              </div>
              <TextField
                margin="dense"
                label="Total Matches to Play"
                fullWidth
                type="number"
                variant="standard"
                autoComplete="off"
                onChange={(e) =>
                  setformdata({ ...formdata, matches: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Address"
                fullWidth
                variant="standard"
                autoComplete="off"
                onChange={(e) =>
                  setformdata({ ...formdata, address: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="City"
                fullWidth
                variant="standard"
                autoComplete="off"
                onChange={(e) =>
                  setformdata({ ...formdata, city: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Pin code"
                fullWidth
                type="number"
                variant="standard"
                autoComplete="off"
                onChange={(e) =>
                  setformdata({ ...formdata, pincode: e.target.value })
                }
              />
              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={formdata.registered}
                    onChange={(e) =>
                      setformdata({ ...formdata, registered: e.target.checked })
                    }
                  />
                }
                label="Registered"
              /> */}
              <div className={styles.orgFormCheckbox}>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setformdata({ ...formdata, registered: e.target.checked })
                    }
                  />
                  <span className={styles.checkmark}></span>
                  Registered
                </label>
              </div>
              {formdata.registered && (
                <>
                  {" "}
                  <TextField
                    margin="dense"
                    label="CIN"
                    fullWidth
                    type="number"
                    variant="standard"
                    autoComplete="off"
                    onChange={(e) =>
                      setformdata({ ...formdata, cin: e.target.value })
                    }
                  />
                  <TextField
                    margin="dense"
                    label="Registration Number"
                    fullWidth
                    type="number"
                    variant="standard"
                    autoComplete="off"
                    onChange={(e) =>
                      setformdata({
                        ...formdata,
                        registrationnumber: e.target.value,
                      })
                    }
                  />
                </>
              )}
              {formdata.registered === false && (
                <>
                  <TextField
                    margin="dense"
                    label="Contract Letter"
                    fullWidth
                    variant="standard"
                    autoComplete="off"
                    onChange={(e) =>
                      setformdata({
                        ...formdata,
                        contractletter: e.target.value,
                      })
                    }
                  />
                  <TextField
                    margin="dense"
                    label="NDA Form"
                    fullWidth
                    variant="standard"
                    autoComplete="off"
                    onChange={(e) =>
                      setformdata({ ...formdata, ndaform: e.target.value })
                    }
                  />
                </>
              )}
              <TextField
                autoFocus
                margin="dense"
                label="Company card"
                fullWidth
                variant="standard"
                autoComplete="off"
                onChange={(e) =>
                  setformdata({ ...formdata, companycard: e.target.value })
                }
              />

              <TextField
                autoFocus
                margin="dense"
                label="Website"
                fullWidth
                variant="standard"
                autoComplete="off"
                onChange={(e) =>
                  setformdata({ ...formdata, website: e.target.value })
                }
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(!open)}>Cancel</Button>
          <Button
            onClick={() => {
              // setOpen(!open);
              submitform();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <div className={styles.homepageVedioection}>
        <video autoPlay muted loop className={styles.homebackground1}>
          <source src="https://3not3-storage.s3.ap-south-1.amazonaws.com/Oscorp+Gaming+Teaser+for+web.webm" />
        </video>
        <div>
          <h3>
            EVOLVE YOUR GAMING <br /> EXPERIENCE..
          </h3>
          <p>
            India’s first smart backed automation technology system to enhance
            <br />
            new gaming experience and organiser your competitive platfrom.
            <br />
          </p>
          {/* <h1>COMING SOON</h1> */}
        </div>
      </div>
      {/* <Swiper
        // autoplay={{ delay: 4000 }}
        ref={swiperRef}
        loop={true}
        modules={[Navigation, HashNavigation]}
        hashNavigation={{
          watchState: true,
        }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onSlideChange={(swipe) => {
          setactiveslide(swipe.realIndex);
        }}
        centeredSlides={true}
        slidesPerView={"auto"}
      >
        <SwiperSlide>
          <div className={styles.homepageVedioection}>
            <video autoPlay muted loop className={styles.homebackground1}>
              <source src="https://res.cloudinary.com/repsoft/video/upload/v1645599606/TeaserForWeb_mtjgat.mp4" />
            </video>
            <div>
              <h3>
                EVOLVE YOUR GAMING <br /> EXPERIENCE
              </h3>
              <p>
                World’s first smart contract and blockchain technology base
                tournament platform<br />
              </p>
              <h1>COMING SOON</h1>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.homepageVedioection}>
            <Image
              src="https://res.cloudinary.com/nakul-londhe/image/upload/v1643574136/gdjvqyzkd9f6cnavpumy.png"
              alt="farcry"
              layout="fill"
            ></Image>
            <div></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.homepageVedioection}>
            <video autoPlay muted loop className={styles.homebackground1}>
              <source src="https://res.cloudinary.com/repsoft/video/upload/v1645511783/TeaserForWeb_2_chek1u.mp4" />
            </video>
            <div>
              <h3>
                EVOLVE YOUR GAMING <br /> EXPERIENCE
              </h3>
              <p>
                India’s first smart contract and blockchain technology base
                tournament platform
              </p>
            </div>
          </div>
        </SwiperSlide>
        <div className={styles.paginationwrapper}>
          {carousalheader.map((item, index) => {
            return (
              <div
                className={styles.custompagination}
                key={index}
                onClick={() => {
                  setactiveslide(index);
                  swiperRef.current?.swiper.slideTo(index);
                }}
              >
                <div
                  className={
                    index === activeslide ? styles.activeradio : styles.radio
                  }
                ></div>
              </div>
            );
          })}
        </div>
      </Swiper> */}
      <div className={"container"} style={{ padding: "1rem" }}>
        <div className={styles.starterGuide}>
          <div className={styles.applyFlex}>
            <div className={styles.applyFlex + " " + styles.steps}>
              <h2>1</h2>
              <i>
                <BsPersonPlus />
              </i>
            </div>

            <div className={styles.stepDes}>
              <h4>Sign Up</h4>
              <p>Create your account by signing Up</p>
            </div>
          </div>
          {isMobile ? (
            <IoIosArrowDown className={styles.downarrow} />
          ) : (
            <AiOutlineRight />
          )}
          <div className={styles.applyFlex}>
            <div className={styles.applyFlex + " " + styles.steps}>
              <h2>2</h2>
              <i>
                <GiBattleAxe />
              </i>
            </div>
            <div className={styles.stepDes}>
              <h4>Compete</h4>
              <p>Join Tournaments compete with others</p>
            </div>
          </div>
          {isMobile ? (
            <IoIosArrowDown className={styles.downarrow} />
          ) : (
            <AiOutlineRight />
          )}
          <div className={styles.applyFlex}>
            <div className={styles.applyFlex + " " + styles.steps}>
              <h2>3</h2>
              <i>
                <GiTrophyCup />
              </i>
            </div>
            <div className={styles.stepDes}>
              <h4>Win &amp; Earn</h4>
              <p>Win the tournament and earn Crypto and money</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.homegamesbg}>
        <div className={styles.homehead + " " + "container"}>
          <h1 className={styles.homeh1}>TRENDING GAMES</h1>
          <hr className={styles.homehr} />
          <h2 className={styles.homeh2}>SEE ALL</h2>
        </div>
        <Carousel
          responsive={responsive}
          swipeable={true}
          // autoPlay={true}
          infinite={true}
          arrows={false}
          // removeArrowOnDeviceType={["superLargeDesktop", "desktop"]}
          className={styles.homegames + " " + "container"}
        >
          <div className={styles.homecard}>
            <div data-aos="flip-right">
              <Link
                exact
                href={
                  logged ? (haveteam ? "/tournament" : "/teams") : "/signup"
                }
              >
                {/* <Image
                    src="https://res.cloudinary.com/nakul-londhe/image/upload/v1643574404/pn7bjnyheenc7xbusmrq.png"
                    width={350}
                    height={488}
                    alt="valorant"
                  /> */}
                <div className={styles.card}>
                  <Image
                    src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645548990/j4wettegyjxadoiqv46w.png"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                  <div className={styles.card1logo}>
                    <Image
                      src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645548896/ownxgb8kcoswoiz9jr0e.png"
                      layout="fill"
                    />
                  </div>
                  <div className={styles.cardimg}>
                    <Image
                      src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645549058/x4pljdfkowghrflw9hfg.png"
                      layout="fill"
                      alt="valorant"
                    />
                  </div>
                </div>
              </Link>
              <h3 className={styles.homeh3}>VALORANT</h3>
            </div>
          </div>

          <div className={styles.homecard}>
            <div data-aos="flip-right">
              <Link
                exact
                href={
                  logged ? (haveteam ? "/tournament" : "/teams") : "/signup"
                }
              >
                {/* <Image
                    src="https://res.cloudinary.com/nakul-londhe/image/upload/v1643574534/xli7nv24giukieryliwo.png"
                    width={350}
                    height={488}
                  /> */}
                <div className={styles.card}>
                  <Image
                    src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645549299/ecr90vlqyfgswpdgej3d.png"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                  <div className={styles.card2logo}>
                    <Image
                      src="https://res.cloudinary.com/nakul-londhe/image/upload/v1650805269/kixhnkx2fudffanpt0le.png"
                      layout="fill"
                    />
                  </div>
                  <div className={styles.cardimg}>
                    <Image
                      src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645549180/nbmvkiyofydvp5sbyimw.png"
                      layout="fill"
                      alt="valorant"
                    />
                  </div>
                </div>
              </Link>
              <h3 className={styles.homeh3}>BGMI</h3>
            </div>
          </div>

          <div className={styles.homecard}>
            <div data-aos="flip-right">
              <Link
                exact
                href={
                  logged ? (haveteam ? "/tournament" : "/teams") : "/signup"
                }
              >
                {/* <Image
                    src="https://res.cloudinary.com/nakul-londhe/image/upload/v1643573892/iwonvaevbgfrdi1whyzj.png"
                    width={350}
                    height={488}
                    alt="fortnite"
                  /> */}
                <div className={styles.card}>
                  <Image
                    src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645549534/fgaxal1826u2rwwoplih.png"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                  <div className={styles.card3logo}>
                    <Image
                      src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645549487/vg9fmv3iuqdf3fxnffqp.png"
                      layout="fill"
                    />
                  </div>
                  <div className={styles.cardimg}>
                    <Image
                      src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645549367/gkd838w0q9sqlikm3pib.png"
                      layout="fill"
                      alt="valorant"
                    />
                  </div>
                </div>
              </Link>
              <h3 className={styles.homeh3}>FORTNITE</h3>
            </div>
          </div>

          <div className={styles.homecard}>
            <div data-aos="flip-right">
              <Link
                exact
                href={
                  logged ? (haveteam ? "/tournament" : "/teams") : "/signup"
                }
              >
                {/* <Image
                    src="https://res.cloudinary.com/nakul-londhe/image/upload/v1643574286/sggjhpbesqtlqhw1nkkq.png"
                    width={350}
                    height={488}
                    alt="dota"
                  /> */}
                <div className={styles.card}>
                  <Image
                    src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645549677/xcuyo3qnzet7jhjuil7u.png"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                  <div className={styles.card1logo}>
                    <Image
                      src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645549808/pnpepuvxjiewlwsn0jvy.png"
                      layout="fill"
                    />
                  </div>
                  <div className={styles.cardimg}>
                    <Image
                      src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645549583/wqnjmbeakkrsqvienuut.png"
                      layout="fill"
                      alt="valorant"
                    />
                  </div>
                </div>
              </Link>
              <h3 className={styles.homeh3}>DOTA</h3>
            </div>
          </div>
        </Carousel>
      </div>
      <section>
        <section className={styles.tournamentslider}>
          <div className={styles.homehead + " " + "container"}>
            <h1 className={styles.homeh1}>TOURNAMENTS</h1>
            <hr className={styles.homehr} />
            <Link
              exact
              href={logged ? (haveteam ? "/tournament" : "/teams") : "/signup"}
            >
              <h2 className={styles.homeh2}>SEE ALL</h2>
            </Link>
          </div>
          <div className={styles.swipercontainer}>
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 20,
                stretch: 0,
                depth: 0,
                modifier: 1,
                slideShadows: false,
              }}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              className={styles.swipercontainer}
            >
              {/* <SwiperSlide className={styles.swiperslide}>
                <Link exact href={"/comingsoon"}>
                  <div className={styles.sliderimg}>
                    <Image
                      src="https://res.cloudinary.com/nakul-londhe/image/upload/v1643576215/jr7lfclcsjdgoegt4z46.png"
                      layout="fill"
                      alt="pubg"
                    />
                  </div>
                </Link>
              </SwiperSlide> */}
              {/* <SwiperSlide className={styles.swiperslide}>
                <Link exact href={"/comingsoon"}>
                  <div className={styles.sliderimg}>
                    <Image
                      src="https://res.cloudinary.com/nakul-londhe/image/upload/v1643576285/sanxfdd6pymo8zscffd4.png"
                      layout="fill"
                      alt="pubg"
                    />
                  </div>
                </Link>
              </SwiperSlide> */}
              {/* <SwiperSlide className={styles.swiperslide}>
                <Link exact href={"/comingsoon"}>
                  <div className={styles.sliderimg}>
                    <Image
                      src="https://res.cloudinary.com/nakul-londhe/image/upload/v1643576365/wcw7kypfumbvf4lnjz55.png"
                      layout="fill"
                      alt="pubg"
                    />
                  </div>
                </Link>
              </SwiperSlide> */}
              {/* <SwiperSlide className={styles.swiperslide}>
                <Link exact href={"/tournament"}>
                  <div className={styles.sliderimg}>
                    <Image
                      src="https://res.cloudinary.com/nakul-londhe/image/upload/v1643576394/duenj2uqwvjkt2dfduvl.png"
                      layout="fill"
                      alt="pubg"
                    />
                  </div>
                </Link>
              </SwiperSlide> */}
              {/* <SwiperSlide className={styles.swiperslide}>
                <Link exact href={"/comingsoon"}>
                  <div className={styles.sliderimg}>
                    <Image
                      src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645548542/hlieqlt2vghj2hce9xr8.png"
                      layout="fill"
                      alt="pubg"
                    />
                  </div>
                </Link>
              </SwiperSlide> */}
              {/* <SwiperSlide className={styles.swiperslide}>
                <Link exact href={"/comingsoon"}>
                  <div className={styles.sliderimg}>
                    <Image
                      src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645548598/o0ngnuqoixuvf74jrtpq.png"
                      layout="fill"
                      alt="pubg"
                    />
                  </div>
                </Link>
              </SwiperSlide> */}
              {/* <SwiperSlide className={styles.swiperslide}>
                <Link exact href={"/comingsoon"}>
                  <div className={styles.sliderimg}>
                    <Image
                      src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645548655/kn9otyrfnnbzfcfo0qd3.png"
                      layout="fill"
                      alt="pubg"
                    />
                  </div>
                </Link>
              </SwiperSlide> */}
              {/* <SwiperSlide className={styles.swiperslide}>
                <Link exact href={"/comingsoon"}>
                  <div className={styles.sliderimg}>
                    <Image
                      src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645548769/lkwmmyr4r2gui8pchum9.png"
                      layout="fill"
                      alt="pubg"
                    />
                  </div>
                </Link>
              </SwiperSlide> */}
              {/* <SwiperSlide className={styles.swiperslide}>
                <Link exact href={"/comingsoon"}>
                  <div className={styles.sliderimg}>
                    <Image
                      src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645548805/rncttktig4was2f6ffau.png"
                      layout="fill"
                      alt="pubg"
                    />
                  </div>
                </Link>
              </SwiperSlide> */}
              <SwiperSlide className={styles.swiperslidecustom}>
                <Link
                  exact
                  href={
                    logged ? (haveteam ? "/tournament" : "/teams") : "/signup"
                  }
                >
                  <div className={styles.sliderimg}>
                    <Image src={card1} layout="fill" alt="pubg" />
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperslidecustom}>
                <Link
                  exact
                  href={
                    logged ? (haveteam ? "/tournament" : "/teams") : "/signup"
                  }
                >
                  <div className={styles.sliderimg}>
                    <Image src={card2} layout="fill" alt="pubg" />
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperslidecustom}>
                <Link
                  exact
                  href={
                    logged ? (haveteam ? "/tournament" : "/teams") : "/signup"
                  }
                >
                  <div className={styles.sliderimg}>
                    <Image src={card3} layout="fill" alt="pubg" />
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperslidecustom}>
                <Link
                  exact
                  href={
                    logged ? (haveteam ? "/tournament" : "/teams") : "/signup"
                  }
                >
                  <div className={styles.sliderimg}>
                    <Image src={card4} layout="fill" alt="pubg" />
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperslidecustom}>
                <Link
                  exact
                  href={
                    logged ? (haveteam ? "/tournament" : "/teams") : "/signup"
                  }
                >
                  <div className={styles.sliderimg}>
                    <Image src={card5} layout="fill" alt="pubg" />
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperslidecustom}>
                <Link
                  exact
                  href={
                    logged ? (haveteam ? "/tournament" : "/teams") : "/signup"
                  }
                >
                  <div className={styles.sliderimg}>
                    <Image src={card6} layout="fill" alt="pubg" />
                  </div>
                </Link>
              </SwiperSlide>
            </Swiper>
          </div>
          {/* <div className={styles.tournamentBottom}>
            Compete in <span className={styles.colouredtext}>Free</span> and{" "}
            <span className={styles.colouredtext}>Paid</span> entry Tournaments
            in just a few clicks
            <br />& earn Crypto and real money.
          </div> */}
        </section>
      </section>

      <div
        style={{
          backgroundImage:
            "url('https://files.slack.com/files-pri/T04DWGNVBEJ-F04PJ2TQ2EN/bg3home.jpg')",
        }}
      >
        <Features />
      </div>

      {/* new code of highlights banner */}
      {/* <div style={{ maxWidth: "100vw", overflow: "hidden" }}>
        <section className={styles.bannerHighlight}>
          <div className={styles.bannerHighlightBackground1}>
            <div className={styles.chracter1}>
              <Image
                // src="https://res.cloudinary.com/nakul-londhe/image/upload/v1643579357/gyjsdvvfpxw5veuknh8u.svg"
                src={background}
                layout="fill"
              />
            </div>
            <div className={styles.chracterSmoke1}>
              <Image
                src="https://res.cloudinary.com/nakul-londhe/image/upload/v1643579562/iepubtq24wajjkdp4g98.svg"
                layout="fill"
              />
            </div>
          </div>
          <div className={styles.bannerHighlightText1}>
            <div data-aos="fade-up">
              <h3>
                "MAKE YOUR COMPETITIVE JUICES OCERCOME <br />
                <span style={{ color: "yellow" }}>YOUR EXCUSES"</span>
              </h3>
              <p>
                Click, Register and Play all your preferred games by building
                your team and competing with other. Win amazing cash prizes and
                gift instantly. With features like live chat, discussion rooms,
                create teams for multiple games, build your socialized network,
                daily exciting prize pool events, and many more to coming soon!!
              </p>
              <Link exact href={logged ? haveteam ? "/tournament" : "/teams" : "/signup"}>
                <button>Play Now</button>
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.bannerHighlight}>
          <div className={styles.bannerHighlightBackgroundOrganise}>
            <div className={styles.chracterSmokeOrganise}>
              <Image
                src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645359887/vnzgwjguw3vdym1hba6h.svg"
                layout="fill"
              />
            </div>
            <div className={styles.chracterOrganise}>
              <Image
                src="https://res.cloudinary.com/nakul-londhe/image/upload/v1650895845/ust4nt55pdnpqgumw4mz.svg"
                layout="fill"
              />
            </div>
          </div>
          <div className={styles.bannerHighlightTextOrganise}>
            <div data-aos="fade-up">
              <h3>
                WANT TO ORGANISE A <br />
                <span style={{ color: "#03de77" }}>TOURNAMENT</span>
              </h3>
              <p>
                Manage your esports competition and league event with right
                backend-Automations technology tools. To make your tournament
                well structure by using our dashboard API system from
                registration, handle matches till end results. All in one
                service for your hectic bulk work to make reliable and seamless
                interactions with participants. Let’s give your competition a
                structure with more enhancement without requiring development
                cost and management service. “Got game? Get your game on with
                3not3”
              </p>
              <button onClick={() => setOpen(!open)}>Apply now</button>
            </div>
          </div>
        </section>

        <section className={styles.bannerHighlight}>
          <div className={styles.bannerHighlightBackground4}>
            <div className={styles.chracter4}>
              <Image
                // src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645358818/mcrdu7o8a0hhksmaqiu7.png"
                src={coin}
                layout="fill"
              // height={700}
              // width={1000}
              />
            </div>
            <div className={styles.chracterSmoke4}>
              <Image
                src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645359747/dewtybxwau5eyglzg39i.svg"
                layout="fill"
              />
            </div>
          </div>
          <div className={styles.bannerHighlightText4}>
            <div data-aos="fade-up">
              <h3>
                WIN IN THE FORM OF <br />
                <span style={{ color: "#faff00" }}>CRYPTO</span>
              </h3>
              <p>
                YES, you heard it right for the First time in India we are bring
                to you a smart contract base and blockchain technology throw
                which you can earn daily a crypto just by completing task, while
                competing with others in tournaments and upgrading your services
                throw 3not3. 100% transparent system with all user privacy
              </p>
            </div>
          </div>
        </section>

        <section className={styles.bannerHighlight}>
          <div className={styles.bannerHighlightBackground2}>
            <div className={styles.chracterSmoke2}>
              <Image
                src="https://res.cloudinary.com/nakul-londhe/image/upload/v1643579635/eovdth2zsctywa2axlwp.svg"
                layout="fill"
              />
            </div>
            <div className={styles.chracter2}>
              <Image
                src="https://res.cloudinary.com/nakul-londhe/image/upload/v1643610005/mmv5dxjpyhqu7ywqryzz.png"
                layout="fill"
              />
            </div>
          </div>
          <div className={styles.bannerHighlightText2}>
            <div data-aos="fade-up">
              <h3>
                FIGHT TO THE <br />
                <span style={{ color: "#70edee" }}>TOP</span>
              </h3>
              <p>
                Participate in tournaments and play your best on leaderboard one
                team, one spirit. Win rewards on the base of your performance of
                leaderboard ranking. Even bottom also have some ups even by
                participating every team earns “not shots” a reward coin which
                player/team can redeem with exciting gifts and offer. Applied on
                task and other service to individual.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.bannerHighlight}>
          <div className={styles.bannerHighlightBackground3}>
            <div className={styles.chracter3}>
              <Image
                src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645360778/cdnlul4bwvnmpzvfvyf6.svg"
                layout="fill"
              />
              <div className={styles.chracter3warrior}>
                <Image
                  src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645359447/hatkoepj21rcdaal005t.svg"
                  layout="fill"
                />
              </div>
            </div>
            <div className={styles.chracterSmoke3}>
              <Image
                src="https://res.cloudinary.com/nakul-londhe/image/upload/v1643579695/joxx5rw3rxz81vor0htj.svg"
                layout="fill"
              />
            </div>
          </div>
          <div className={styles.bannerHighlightText1}>
            <div data-aos="fade-up">
              <h3>
                WE ARE
                <br />
                <span style={{ color: "#58cc2f" }}>HERE FOR</span>
              </h3>
              <p>
                Organization, Participation, Custom Backed Integration, Shop,
                Live interaction, Numerous gaming options, and earning. Faster
                you run, the sooner you finish register yourself now with 3not3.
                We do it for the kicks. Meet you soon on the deck “WINNER”
              </p>
            </div>
          </div>
        </section>
      </div> */}
      <Highlights />

      {/* our Partners */}
      {/* <div className={styles.ourpartners + " " + "container"}>
        <h2>OUR PARTNERS</h2>
        <div className={styles.ourpartnerArea}>
          <Partner
            logo={
              "https://res.cloudinary.com/nakul-londhe/image/upload/v1643603761/bqgn8gatyiimt3phbxcg.svg"
            }
          />
          <Partner
            logo={
              "https://res.cloudinary.com/nakul-londhe/image/upload/v1643603822/p2u5ukbmt53nmjqndib6.svg"
            }
          />
          <Partner
            logo={
              "https://res.cloudinary.com/nakul-londhe/image/upload/v1643603895/ypayndb9vfu57dbklkij.svg"
            }
          />
          <Partner
            logo={
              "https://res.cloudinary.com/nakul-londhe/image/upload/v1643603958/douwrn3oxymrbgqnixow.svg"
            }
          />
        </div>
      </div> */}
      {/* stats */}
      {/* <div className={styles.stats}>
        <div>
          <span>10</span>
          <p>Lorem ipsum dolor sit amet, </p>
        </div>
        <div className={styles.statsBar}></div>
        <div>
          <span>300+</span>
          <p>Lorem ipsum dolor sit amet, </p>
        </div>
        <div className={styles.statsBar}></div>
        <div>
          <span>250+</span>
          <p>Lorem ipsum dolor sit amet, </p>
        </div>
      </div> */}
      {/* subscribe letter */}
      <div className={styles.subscribe}>
        <h2>SUBSCRIBE TO OUR NEWSLETTER</h2>
        <span>
          <input type="text" placeholder="Enter Your email address ..." />
          <button>Subscribe</button>
        </span>
        {/* <div className={styles.footersmoke}>
          <Image
            src="https://res.cloudinary.com/nakul-londhe/image/upload/v1645106461/zaekgmhjsxhf2g30xzzj.png"
            layout="fill"
          />
        </div> */}
      </div>
      <HomepageFooter />
    </div>
  );
};

export default Homepage;

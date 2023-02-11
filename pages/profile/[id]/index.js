import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "../../../styles/Profile.module.css";
import Image from "next/image";
import india from "../../../assets/img/India.png";
import Cropper from "react-easy-crop";
import { MdModeEditOutline } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { TiUpload } from "react-icons/ti";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-toastify";
import Moment from "react-moment";
import Link from "next/link";
import { Profileteamcard } from "../../../components/Profileteamcard";
import { Footer } from "../../../components/Footer";
import { Loader } from "../../../components/Loader";

import {
  FaMapMarkedAlt,
  FaSteam,
  FaTwitch,
  FaShareAlt,
  FaFacebook,
  FaCheckCircle,
} from "react-icons/fa";
import { AiFillTwitterCircle, AiOutlineInstagram } from "react-icons/ai";
import { useStateValue } from "../../../Context/StateProvider";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getOrientation } from "get-orientation/browser";
import { getCroppedImg, getRotatedImage } from "../../../util/cropImage";
import Dialog from "@mui/material/Dialog";
import {
  GET_USER_DATA,
  UPDATE_USER,
  UPDATE_USER_IMAGE,
  VERIFY_EMAIL_AGAIN,
} from "../../../constants/routes";
import Button from "@mui/material/Button";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

const profile = ({ profile }) => {
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openBio, setOpenBio] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [openBackground, setOpenBackground] = React.useState(false);

  const [{ user }, dispatch] = useStateValue();
  const [editbox, setEditbox] = useState("none");
  const [pData, setPData] = useState();
  const [blur, setBlur] = useState("0px");
  const [editProfile, setEditProfile] = useState("none");
  const [editBackground, setEditBackground] = useState("none");
  const [aboutMe, setaboutMe] = useState("");
  const [socials, setSocials] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    steam: "",
    twitch: "",
  });
  const [image, setImage] = useState([]);
  const [imageBan, setImageBan] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [switcher, setSwitcher] = useState(true);
  const [show, setShow] = useState(true);
  const [favGames, setfavGames] = useState([
    "Valorant",
    "Overwatch",
    "Dota 2",
    "Fortnite",
    "Fifa",
    "BGMI",
    "Apex Legend",
    "Rocket League",
    "FreeFire",
    "COD",
    "Clash of Clans",
    "CSGO",
  ]);
  const [newarr, setnewarr] = useState([]);
  const [value, setValue] = useState(favGames[0]);

  const showEditBox = () => {
    editbox === "block"
      ? (setEditbox("none"), setBlur("blur(0px)"))
      : (setEditbox("block"), setBlur("blur(5px)"));
  };
  const [imageSrc, setImageSrc] = React.useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [bannerImage, setbannerImage] = useState(null);
  const [profileImage, setProfileImage] = useState();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
      const reader = new FileReader();
      reader.readAsDataURL(croppedImage);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
    } catch (e) {}
  }, [imageSrc, croppedAreaPixels, rotation]);
  const showCroppedBannerImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        bannerImage,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
      const reader = new FileReader();
      reader.readAsDataURL(croppedImage);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      showImage();
    } catch (e) {}
  }, [bannerImage, croppedAreaPixels, rotation]);
  const onBannerFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageBan(file);
      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      setbannerImage(imageDataUrl);
    }
  };
  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      let imageDataUrl = await readFile(file);

      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      setImageSrc(imageDataUrl);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };
  const handleReset = (e) => {
    setImage([]);
    setSwitcher(true);
    setShow(true);
    setCroppedImage();
    setImageSrc(null);
    setbannerImage(null);
    setPreviewImage(null);
    setOpenBio(false);
    setOpenProfile(false);
    setOpenBackground(false);
  };

  const router = useRouter();
  const paramURL = router.query;
  const UserId = user?.user?._id;
  const axiosinstance = axios.create({});
  axiosinstance.interceptors.request.use(
    function (config) {
      const { token } = JSON.parse(localStorage.getItem("authUser"));
      const userToken = token.token;
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    function (error) {
      return Promise.reject((error) => {
        toast.error("Error in Updating Profile!");
      });
    }
  );

  const data = {
    bio: aboutMe,
    socialLinks: socials,
    favoriteGames: newarr,
  };
  const getData = async () => {
    const res = await axios
      .get(`${GET_USER_DATA}${paramURL.id}`)
      .then((res) => setPData(res.data));
  };
  const handleUpdateChange = () => {
    axiosinstance.post(`${UPDATE_USER}${UserId}`, data).then((res) => {
      // console.log(res.data);
      getData();
      showEditBox();
      toast.success("Profile Updated!");
      setOpenBio(false);
    });
  };
  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  // console.log(pData);

  const handleVerify = () => {
    axiosinstance.post(`${VERIFY_EMAIL_AGAIN}`).then((res) => {
      toast.success(res.data.message);
      handleClickClose();
    });
  };

  useEffect(() => {
    const getData = async () => {
      const res = await axios
        .get(`${GET_USER_DATA}${paramURL.id}`)
        .then((res) => setPData(res.data));
    };
    getData();
  }, [paramURL]);

  useEffect(() => {
    setaboutMe(profile.user.bio);
    if (profile.user.favoriteGames?.length !== 0) {
      newarr.splice(0, newarr.length, ...profile.user.favoriteGames);
    }
    const removeObjectsFromFavGames = new Set(newarr);
    const filtered = favGames.filter((x) => !removeObjectsFromFavGames.has(x));
    setfavGames(filtered);
    setSocials({
      facebook: profile.user.socialLinks?.facebook
        ? profile.user.socialLinks.facebook
        : "",
      instagram: profile.user.socialLinks?.instagram
        ? profile.user.socialLinks.instagram
        : "",
      twitter: profile.user.socialLinks?.twitter
        ? profile.user.socialLinks.twitter
        : "",
      steam: profile.user.socialLinks?.steam
        ? profile.user.socialLinks.steam
        : "",
      twitch: profile.user.socialLinks?.twitch
        ? profile.user.socialLinks.twitch
        : "",
    });
    setProfileImage(profile?.user.profileImage);
  }, [profile]);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        if (user.user.username === profile.user.username) {
          profile.user.isEmailVerified === true
            ? alert("Email Verified!")
            : alert("Email Not Verified!");

          console.log("i am here");
        }
      }, [2000]);
    }
  }, []);

  const saveProfile = () => {
    setOpenProfile(false);
    const formData = new FormData();
    formData.set("name", "profileImage");
    formData.set("image", croppedImage);

    axiosinstance
      .post(`${UPDATE_USER}${UserId}/image`, formData)
      .then((res) => {
        // console.log(res.data);
        toast.success("Image Changed !");
        setEditProfile("none"), setBlur("blur(0px)");
        handleReset();
        getData();
      })
      .catch((err) => {
        toast.error("Error in Updating Profile Image!");
      });
  };

  const saveBanner = () => {
    setOpenBackground(false);
    const formData = new FormData();
    formData.set("name", "bannerImage");
    formData.set("image", croppedImage);

    axiosinstance
      .post(`${UPDATE_USER}${UserId}/image`, formData)
      .then((res) => {
        // console.log(res.data);
        toast.success("Image Changed !");
        setEditBackground("none"), setBlur("blur(0px)");
        handleReset();
        getData();
      })
      .catch((err) => {
        toast.error("Error in Updating Banner Image!");
      });
  };
  // console.log(profile);

  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClickClose}>
          <DialogTitle sx={{ color: "#14569b !important" }}>Verify</DialogTitle>
          <DialogContent sx={{ color: "white !important" }}>
            <p>
              Seems like you are not verified yet! <br></br> please click the
              button below to receive a verification mail
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose}>Cancel</Button>
            <Button onClick={handleVerify}>Verify</Button>
          </DialogActions>
        </Dialog>
      </div>
      <Dialog open={openBio} fullWidth={true} maxWidth={false}>
        <div className={styles.editPlayerInfo}>
          <div
            className={styles.closeButtonOfEdit}
            onClick={() => handleReset()}
          >
            <ImCross />
          </div>
          <div className={styles.editPlayerImage}>
            <Image
              className={styles.borderedImage}
              src={
                pData?.user.profileImage
                  ? pData?.user.profileImage
                  : profile?.user.profileImage
              }
              layout="fill"
            />
          </div>
          <div className={styles.editPlayerAbout}>
            <h5>About me</h5>
            <textarea
              name="aboutplayer"
              id=""
              onChange={(e) => {
                setaboutMe(e.target.value);
              }}
              value={aboutMe}
              rows="10"
              placeholder="Write About yourself!"
            ></textarea>
          </div>
          <div className={styles.editPlayerFavoriteGames}>
            <section>
              <div id={styles.gameAreaTitle}>
                <h5>Favourite games</h5>
                <p>Search your games and add them</p>
              </div>
              <div id={styles.gameSearch}>
                <Autocomplete
                  disableClearable={true}
                  disablePortal
                  id="combo-box-demo"
                  options={favGames}
                  sx={{ width: 300 }}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                    newarr.push(newValue);
                    removeItemOnce(favGames, newValue);
                    setfavGames(favGames);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Games" />
                  )}
                />
              </div>
            </section>
            <div style={{ display: "flex", marginTop: "2%", flexWrap: "wrap" }}>
              {newarr?.map((game, index) => (
                <span key={index}>
                  {game}
                  <ImCross
                    onClick={() => {
                      removeItemOnce(newarr, game);
                      favGames.push(game);
                      setnewarr([...newarr]);
                    }}
                  />
                </span>
              ))}
            </div>
          </div>
          <div className={styles.editPlayerSocialHandles}>
            <h5>Social Handles</h5>
            <span>
              <span>
                <FaSteam />
                <input
                  type="url"
                  placeholder="Paste Your URL Here"
                  onChange={(e) => {
                    setSocials({ ...socials, steam: e.target.value });
                  }}
                  value={socials.steam}
                />
              </span>
              <span>
                <FaFacebook />
                <input
                  type="url"
                  placeholder="Paste Your URL Here"
                  onChange={(e) => {
                    setSocials({ ...socials, facebook: e.target.value });
                  }}
                  value={socials.facebook}
                />
              </span>
              <span>
                <AiFillTwitterCircle />
                <input
                  type="url"
                  placeholder="Paste Your URL Here"
                  onChange={(e) => {
                    setSocials({ ...socials, twitter: e.target.value });
                  }}
                  value={socials.twitter}
                />
              </span>
              <span>
                <FaTwitch />
                <input
                  type="text"
                  placeholder="Paste Your URL Here"
                  onChange={(e) => {
                    setSocials({ ...socials, twitch: e.target.value });
                  }}
                  value={socials.twitch}
                />
              </span>
              <span>
                <AiOutlineInstagram />
                <input
                  type="url"
                  placeholder="Paste Your URL Here"
                  onChange={(e) => {
                    setSocials({ ...socials, instagram: e.target.value });
                  }}
                  value={socials.instagram}
                />
              </span>
            </span>
          </div>
          <div className={styles.editPlayerInfoButtons}>
            <button id={styles.discardButton} onClick={() => setOpenBio(false)}>
              Cancel
            </button>
            <button onClick={handleUpdateChange} id={styles.saveButton}>
              Save Changes
            </button>
          </div>
        </div>
      </Dialog>
      {/* upload profile pic */}
      <Dialog open={openProfile} fullWidth={true}>
        <div className={styles.uploadProfilePic}>
          <span className={styles.boxTitle}>
            <h3>Add photo</h3>
            <i onClick={() => handleReset()}>
              <ImCross />
            </i>
          </span>
          <div className={styles.cbox}>
            <center>
              {previewImage !== null ? (
                <img className={styles.profilePhoto} src={previewImage} />
              ) : (
                " "
              )}
            </center>
            {imageSrc && (
              <div className={styles.cropper}>
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={1 / 1}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
            )}

            <center>
              {switcher && (
                <>
                  <label htmlFor="file" style={{ position: "relative" }}>
                    <input
                      type="file"
                      onChange={onFileChange}
                      accept="image/*"
                      className={styles.inputFile}
                    />
                    <p className={styles.inputFileLable}>
                      <i>
                        <TiUpload />
                      </i>
                      Choose Image
                    </p>
                  </label>
                </>
              )}
              {imageSrc && (
                <button
                  onClick={showCroppedImage}
                  variant="contained"
                  color="primary"
                >
                  Crop
                </button>
              )}
              {croppedImage && <button onClick={saveProfile}>Save</button>}
            </center>
          </div>
        </div>
      </Dialog>
      {/* update background photo */}
      <Dialog open={openBackground} fullWidth={true}>
        <div className={styles.updateBackgroundPic}>
          <span className={styles.boxTitle}>
            <h3>Background photo</h3>
            <i onClick={() => handleReset()}>
              <ImCross />
            </i>
          </span>
          <div className={styles.cbox}>
            <center>
              {previewImage !== null ? (
                <img className={styles.bannerPhoto} src={previewImage} />
              ) : (
                " "
              )}
            </center>
            {bannerImage && (
              <div className={styles.cropper}>
                <Cropper
                  image={bannerImage}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={3 / 1}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
            )}
            <center>
              {switcher && (
                <>
                  <label htmlFor="file" style={{ position: "relative" }}>
                    <input
                      type="file"
                      onChange={onBannerFileChange}
                      accept="image/*"
                      className={styles.inputFile}
                    />
                    <p className={styles.inputFileLable}>
                      <i>
                        <TiUpload />
                      </i>
                      Choose Banner
                    </p>
                  </label>
                </>
              )}
              {bannerImage && (
                <button
                  onClick={showCroppedBannerImage}
                  variant="contained"
                  color="primary"
                >
                  Crop
                </button>
              )}
              {croppedImage && <button onClick={saveBanner}>Save</button>}
            </center>
          </div>
        </div>
      </Dialog>
      <div className={styles.profileConatiner + " " + "container"}>
        {/* new code */}

        <div className={styles.personalProfileSection}>
          {/* profile image and banner */}
          <div className={styles.profileBannerContainer}>
            <div className={styles.profileBannerCircle}>
              <Image
                src={
                  pData?.user
                    ? pData.user.bannerImage
                    : profile?.user.bannerImage
                }
                layout="fill"
              />
            </div>
            {user?.user?.username === profile?.user?.username ? (
              <div
                className={styles.profileBannerEditIcon}
                onClick={() => setOpenBackground(true)}
              >
                <BiEdit />
              </div>
            ) : (
              " "
            )}
            <div>
              <div className={styles.profileImageCircle}>
                <Image
                  src={
                    pData?.user
                      ? pData.user.profileImage
                      : profile?.user.profileImage
                  }
                  layout="fill"
                />
              </div>
              {user?.user?.username === profile?.user?.username ? (
                <div
                  className={styles.profileImageEditIcon}
                  onClick={() => setOpenProfile(true)}
                >
                  <MdModeEditOutline />
                </div>
              ) : (
                " "
              )}
            </div>
          </div>
          {/* player About  */}
          <div className={styles.profileAboutmeContainer}>
            {/* row 1 */}
            <div className={styles.profileAboutmeContainerRow1}>
              <div className={styles.playerLocationContainer}>
                {/* <FaMapMarkedAlt />
                <span className={styles.playerCountry}>
                  <Image src={india} width={35} height={20} />
                  <p>India</p>
                </span> */}
              </div>
              <div className={styles.playerEmailInfo}>
                <p
                  style={{
                    display: "flex",

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {pData?.user.username}
                  {pData?.user.isEmailVerified === true ? (
                    <i style={{ marginLeft: "5px", color: "#08e947" }}>
                      <FaCheckCircle />
                    </i>
                  ) : user && user.user.username === profile.user.username ? (
                    <i
                      style={{
                        marginLeft: "5px",
                        marginTop: "-1px",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <InfoSharpIcon
                        onClick={handleClickOpen}
                        fontSize="small"
                      />
                    </i>
                  ) : (
                    ""
                  )}
                </p>

                <p>{pData?.user.email}</p>
              </div>
              <div className={styles.socialIcons}>
                {pData?.user.socialLinks?.steam === "" ? (
                  ""
                ) : (
                  <a href={pData?.user.socialLinks.steam} target="_blank">
                    <i className={styles.steam}>
                      <FaSteam />
                    </i>
                  </a>
                )}
                {pData?.user.socialLinks.facebook === "" ? (
                  ""
                ) : (
                  <a href={pData?.user.socialLinks.facebook} target="_blank">
                    <i className={styles.facebook}>
                      <FaFacebook />
                    </i>
                  </a>
                )}
                {pData?.user.socialLinks.twitter === "" ? (
                  ""
                ) : (
                  <a href={pData?.user.socialLinks.twitter} target="_blank">
                    <i className={styles.twitter}>
                      <AiFillTwitterCircle />
                    </i>
                  </a>
                )}
                {pData?.user.socialLinks.twitch === "" ? (
                  ""
                ) : (
                  <a href={pData?.user.socialLinks.twitch} target="_blank">
                    <i className={styles.twitch}>
                      <FaTwitch />
                    </i>
                  </a>
                )}
                {pData?.user.socialLinks.instagram === "" ? (
                  ""
                ) : (
                  <a href={pData?.user.socialLinks.instagram} target="_blank">
                    <i className={styles.instagram}>
                      <AiOutlineInstagram />
                    </i>
                  </a>
                )}
                <i
                  className={styles.shareit}
                  onClick={() => {
                    const el = document.createElement("input");
                    el.value = window.location.href;
                    document.body.appendChild(el);
                    el.select();
                    document.execCommand("copy");
                    document.body.removeChild(el);
                    toast.success("Link Copied");
                  }}
                >
                  <FaShareAlt />
                </i>
              </div>
            </div>
            {/* row 2 */}
            <h5>About Me</h5>
            <p className={styles.aboutmeP}>{pData?.user.bio}</p>
            <span className={styles.innerInfo}>
              <span style={{ marginRight: ".7rem" }}>
                <span style={{ color: "#1B86ED", marginRight: ".3rem" }}>
                  Joined
                </span>
                <Moment format="DD MMMM YYYY">{profile.user.createdAt}</Moment>
              </span>
              {/* <span style={{ marginRight: ".7rem" }}>
                <span style={{ color: "#1B86ED", marginRight: ".3rem" }}>
                  Age
                </span>{" "}
                21
              </span> */}
              {/* <span style={{ marginRight: ".7rem" }}>
                <span style={{ color: "#1B86ED", marginRight: ".3rem" }}>
                  From
                </span>{" "}
                INDIA
              </span> */}
            </span>
            {/* row 3 */}
            {pData?.user.favoriteGames.length !== 0 && (
              <>
                <div className={styles.playerLikedGames}>
                  <span style={{ color: "#1B86ED", marginRight: ".7rem" }}>
                    Game
                  </span>
                  {pData?.user.favoriteGames?.map((game, index) => (
                    <p key={index}>{game}</p>
                  ))}
                </div>
              </>
            )}
            {user?.user?.username === profile?.user?.username ? (
              <button onClick={() => setOpenBio(true)}>EDIT BIO</button>
            ) : (
              ""
            )}
          </div>
          {/* player Teams */}
          <div className={styles.profileTeamsContainer}>
            <span className={styles.profileTeamsContainerHeader}>
              <h5>Teams</h5>
              <Link href="/teams">
                {user?.user?.username === profile?.user?.username &&
                profile?.user.teams.length !== 0 ? (
                  <button>View All</button>
                ) : (
                  <>
                    {user?.user?.username === profile?.user?.username && (
                      <Link href="/teams">
                        <button>Create Team</button>
                      </Link>
                    )}
                  </>
                )}
              </Link>
            </span>
            {profile?.user.teams.length !== 0 ? (
              <div className={styles.playerTeams}>
                <Profileteamcard teams={profile?.user.teams} />
              </div>
            ) : user?.user?.username === profile?.user?.username ? (
              <center>You Don't have any teams yet.</center>
            ) : (
              <center>{profile?.user?.username} has no teams yet.</center>
            )}
          </div>
        </div>
        {/*  */}
        <Footer />
      </div>
    </>
  );
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export const getServerSideProps = async (context) => {
  const res = await fetch(`${GET_USER_DATA}${context.params.id}`);

  const profile = await res.json();

  return {
    props: {
      profile,
    },
  };
};

export default profile;

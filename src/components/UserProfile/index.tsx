import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Loading from "@components/Loading";
import { getProfile } from "@api/profile";
import { menuState, userState } from "@store/state";
import { TEST_IMAGE } from "@shared/dummy";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    image: "",
    username: "",
    bio: "",
    following: false,
  });
  const { image, username, bio, following } = profile;
  const [loading, setLoading] = useState(true);

  const setMenu = useSetRecoilState(menuState);
  const user = useRecoilValue(userState);
  const { userID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    user.username === userID ? setMenu(5) : setMenu(-1);
  }, [setMenu, user.username, userID]);

  useEffect(() => {
    const initProfile = async () => {
      const data = await getProfile(`/profiles/${userID}`);
      setProfile({
        // FIXME: API error
        // image: data.profile.image,
        image: TEST_IMAGE,
        username: data.profile.username,
        bio: data.profile.bio,
        following: data.profile.following,
      });
      setLoading(false);
    };
    initProfile();
  }, [navigate, userID]);

  return (
    <>
      <div className="user-info">
        {loading ? (
          <Loading height="30vh" />
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={image} className="user-img" alt="profile" />
                <h4>{username}</h4>
                <p>{bio}</p>
                <Link to="/settings">
                  <button className="btn btn-sm btn-outline-secondary action-btn">
                    <i className="ion-gear-a"></i> Edit Profile Settings
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;

import React, { useState, useEffect } from 'react';

import Button from 'common/lib/components/Button';
import { Forks, Likes, Views } from '../../components/Icons';
import { H3, H4 } from '../../components/Typography';
import Badges from './Badges';
import {
  Avatar,
  Header,
  Aside,
  Stats,
  Stat,
  AsideWrapper,
  Buttons,
} from './_sidebar.elements';

import deleteAccount from '../../utils/deleteAccount';
import fetchCurrentUser from '../../utils/fetchCurrentUser';
import editCurrentUser from '../../utils/editProfile';
import Editing from './Editing';
import Modal from './Modal';

const kFormatter = num => (num > 999 ? (num / 1000).toFixed(1) + 'k' : num);

export default ({
  avatar_url,
  username,
  id,
  bio,
  name,
  view_count,
  received_like_count,
  forked_count,
  badges,
  twitter,
  profile_email,
  sandbox_count_per_template,
  inserted_at,
}) => {
  const [user, setUser] = useState({});
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [changedBio, setBio] = useState(bio);
  const [changedEmail, setEmail] = useState(profile_email);
  const [changedTwitter, setTwitter] = useState(twitter);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      fetchCurrentUser().then(d => setUser(d));
    }
  }, []);

  const closeAccount = async () => {
    setLoading(true);
    await deleteAccount({
      username,
      id,
    });
    setModal(false);
    setLoading(false);
    // logout
    localStorage.removeItem('jwt');
    // redirect to homepage
    window.location.href = 'http://codesanbdox.io';
  };

  const editProfile = async () => {
    const profile = await editCurrentUser(username, {
      profile_email: changedEmail,
      twitter: changedTwitter,
      bio: changedBio,
    });

    console.log(profile);
    setEditing(false);
  };

  return (
    <>
      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        onClick={() => closeAccount()}
        loading={loading}
      />
      <AsideWrapper>
        <Aside>
          <Header>
            <Avatar src={avatar_url} alt={name} width="96" height="96" />
            <div>
              <H3>{name}</H3>
              <H4>{username}</H4>
            </div>
          </Header>
          <Editing
            changeBio={setBio}
            changeTwitter={setTwitter}
            changeEmail={setEmail}
            bio={bio}
            twitter={twitter}
            profile_email={profile_email}
            inserted_at={inserted_at}
            editing={editing}
          >
            <Stats>
              <Stat>
                <Views /> {kFormatter(view_count)}
              </Stat>
              <Stat>
                <Likes /> {kFormatter(received_like_count)}
              </Stat>
              <Stat>
                <Forks /> {kFormatter(forked_count)}
              </Stat>
            </Stats>
          </Editing>
          {username === user.username && (
            <Buttons>
              {editing ? (
                <Button small onClick={() => editProfile()}>
                  Save Profile
                </Button>
              ) : (
                <Button small onClick={() => setEditing(true)}>
                  Edit Profile
                </Button>
              )}
              <Button small danger onClick={() => setModal(true)}>
                Delete Account
              </Button>
            </Buttons>
          )}
        </Aside>
        <Badges
          badges={badges}
          username={username}
          templateSandboxes={sandbox_count_per_template}
        />
      </AsideWrapper>
    </>
  );
};

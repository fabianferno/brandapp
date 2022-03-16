import React, { useState, useRef } from 'react';
import { Button } from 'reactstrap';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import Highlight from '../../components/Highlight';

import axios from 'axios';

function CreateProject({ user, error, isLoading }) {
  const router = useRouter();
  const searchUserTextRef = useRef();
  const [collaboratorFound, setcollaboratorFound] = useState(false);
  const [collaboratorNotFound, setcollaboratorNotFound] = useState(false);

  const [projectName, setProjectName] = useState({});
  const [description, setDescription] = useState({});
  const [url, setUrl] = useState({});

  const [selectedCollaborator, setSelectedCollaborator] = useState([]); // A User object from the database
  const [projectCollaborators, setProjectCollaborators] = useState([]);

  const searchUser = () => {
    axios
      .get('/api/users', {
        params: {
          email: searchUserTextRef.current.value.trim().toLowerCase()
        }
      })
      .then(function (response) {
        if (response.data) {
          setSelectedCollaborator(response.data);
          setcollaboratorFound(true);
          setcollaboratorNotFound(false);
        } else {
          setcollaboratorFound(false);
          setcollaboratorNotFound(true);
        }
      })
      .catch(function (error) {
        setcollaboratorFound(false);
        console.log(error);
      });
  };

  const createProject = owner_email => {
    axios
      .post('/api/projects', {
        name: projectName,
        createdBy: owner_email,
        description: description,
        url: url,
        collabs: projectCollaborators.filter(collaborator => collaborator.role === 'collab'),
        admins: projectCollaborators.filter(collaborator => collaborator.role === 'admin')
      })
      .then(function (response) {
        console.log(response);
        router.push('/dashboard');
      })
      .catch(function (error) {
        setcollaboratorFound(false);
        console.log(error);
      });
  };

  function addCollaborator(collaborator) {
    if (!projectCollaborators.some(item => item._id === collaborator._id)) {
      var newCollaborators = projectCollaborators;
      collaborator.role = 'collab';
      newCollaborators.push(collaborator);
      setProjectCollaborators(newCollaborators);
      searchUserTextRef.current.value = '';
      setcollaboratorFound(false); // remove the collaborator from the list
    }
  }

  function changeRole(_id, e) {
    if (e.target.checked) {
      // if the role is super
      var newCollaborators = projectCollaborators;
      newCollaborators.forEach(function (item) {
        if (item._id === _id) {
          item.role = 'admin';
        }
      });
      setProjectCollaborators(newCollaborators);
    } else {
      var newCollaborators = projectCollaborators;
      newCollaborators.forEach(function (item) {
        if (item._id === _id) {
          item.role = 'collab';
        }
      });
      setProjectCollaborators(newCollaborators);
    }
  }

  function removeCollaborator(_id) {
    var updatedList = projectCollaborators.filter(item => item._id !== _id);
    setProjectCollaborators(updatedList);
    // console.log(projectCollaborators);
  }

  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <>
          <div className="mb-5 d-flex justify-content-between  align-items-center">
            <h1 className="font-weight-bold">Create your Project</h1>
          </div>
          <section className="pb-5 mb-5">
            <form>
              <div className="form-group">
                <label htmlFor="inputName">Name</label>
                <input
                  type="text"
                  className="p-3 d-flex bg-dark text-white  rounded focus-none"
                  style={{ width: '100%' }}
                  id="inputName"
                  placeholder="Project Name - Eg. Unicorn Go 🎫"
                  onChange={e => {
                    setProjectName(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputDescription">Description</label>
                <input
                  type="text"
                  className={'p-3 d-flex bg-dark text-white  rounded focus-none'}
                  style={{ width: '100%' }}
                  id="inputDescription"
                  placeholder="Describe your Project - Eg. An app to book unicorn rides 🦄"
                  onChange={e => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputUrl">URL</label>
                <input
                  type="text"
                  className={'p-3 d-flex bg-dark text-white  rounded focus-none'}
                  style={{ width: '100%' }}
                  id="inputUrl"
                  placeholder="You app's URL - Eg. https://book.unicorngo.com"
                  onChange={e => {
                    setUrl(e.target.value);
                  }}
                />
              </div>
              <div className="form-group text-right">
                <label htmlFor="inputSearchUser">Add Collaborators to this project</label>

                <div className="input-group mb-3 ">
                  <input
                    id="inputSearchUser"
                    ref={searchUserTextRef}
                    type="text"
                    className="d-flex text-white p-3 bg-dark"
                    placeholder="Email"
                    aria-label="Email"
                    onKeyUp={e => e.key === 'Enter' && searchUser()}
                  />

                  <div className="input-group-append">
                    <button className="btn btn-outline-primary" onClick={() => searchUser()} type="button">
                      Search for Collaborator 🔍
                    </button>
                    {collaboratorFound && (
                      <button
                        type="button"
                        onClick={() => addCollaborator(selectedCollaborator)}
                        className="btn btn-primary text-white font-weight-bold"
                        key={selectedCollaborator._id}>
                        Add to Project ➕
                      </button>
                    )}
                    {collaboratorNotFound && (
                      <button type="button" className="disabled btn btn-primary text-white font-weight-bold">
                        Collab not found 🤷‍♂️. Ask them to signup first!
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div></div>
            </form>

            <div className="text-right">
              <h6 className="text-secondary mb-3">Search and Add them to the project to display below.</h6>
              {projectCollaborators.length > 0
                ? projectCollaborators.map(item => (
                    <div className="text-right btn btn-primary mx-2" key={item._id}>
                      <span className="h3 font-weight-bold text-white">{item.fullName} </span>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input text-dark"
                          type="checkbox"
                          role="switch"
                          id="roleToggle"
                          onChange={e => changeRole(item._id, e)}
                        />
                        <label className="form-check-label text-white" htmlFor="flexSwitchCheckChecked">
                          Super Collab?
                        </label>
                      </div>
                      <div
                        type="button"
                        onClick={() => removeCollaborator(item._id)}
                        className="mt-2 badge rounded-pill  bg-dark">
                        Remove ❌
                      </div>
                    </div>
                  ))
                : null}
            </div>

            <div
              onClick={() => createProject(user.email)}
              className="mt-3 btn btn-block btn-lg text-white font-weight-bold btn-primary p-3">
              Create Project and Woo Hoo! 🦝
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default withPageAuthRequired(CreateProject, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});

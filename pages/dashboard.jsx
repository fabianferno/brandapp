import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
// import { useUserData } from '../components/UserDataContext';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Highlight from '../components/Highlight';

function Dashboard() {
  const { user, isLoading } = useUser();

  const [projects, setProjects] = useState([]);
  const [projectsLoaded, setProjectsLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      axios
        .get('/api/users', {
          params: {
            email: user.email
          }
        })
        .then(function (response) {
          axios
            .post('/api/projects/user', {
              _id: response.data._id
            })
            .then(function (response) {
              console.log(response.data);
              setProjects(response.data);
              setProjectsLoaded(true);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          setUserData({});
          console.log(error);
        });
    }
  }, [user]);

  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <main className="my-5 pb-5">
          <div>
            <section id="owned projects">
              <div className="d-flex align-items-center justify-content-between">
                <h1 className="font-weight-bold">Projects you own</h1>{' '}
              </div>
              <div className="d-flex">
                <div className="mt-4 mr-5 btn text-left card shadow card-body border-primary text-white rounded col-md-3 col-12">
                  <Link href={`/projects/create`}>
                    <div className="h1 font-weight-bold">Create a Project ⚡</div>
                  </Link>
                </div>
                {projectsLoaded ? (
                  projects.owned.length > 0 ? (
                    projects.owned.map(project => (
                      <div
                        key={project._id}
                        className="mt-4 mr-5 btn text-right card card-body bg-primary text-white rounded col-3">
                        <Link href={`/projects/${project._id}`} key={project._id}>
                          <div>
                            <h2 className="bg-dark p-2 rounded font-weight-bold">{project.name}</h2>
                            <h5 className="p-2">{project.description}</h5>
                            <p className="p-2 badge ">{project.url}</p>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="text-dark mt-5 ">You don't own any projects yet. Create a new one.</div>
                  )
                ) : (
                  <Loading></Loading>
                )}
              </div>
            </section>
          </div>
          <div>
            <section id="assigned projects" className="mt-5">
              <div className="d-flex align-items-center justify-content-between">
                <h1 className="font-weight-bold">Projects you are assigned to</h1>{' '}
              </div>
              {projectsLoaded ? (
                projects.assigned.length > 0 ? (
                  projects.assigned.map(project => (
                    <div
                      key={project._id}
                      className="mt-4 mr-5 btn text-right card card-body bg-primary text-white rounded col-3">
                      <Link href={`/projects/${project._id}`} key={project._id}>
                        <div>
                          <h2 className="bg-dark p-2 rounded font-weight-bold">{project.name}</h2>
                          <h5 className="p-2">{project.description}</h5>
                          <p className="p-2 badge ">{project.url}</p>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-dark mt-5">No projects are assigned to you yet.</div>
                )
              ) : (
                <Loading></Loading>
              )}
            </section>
          </div>
        </main>
      )}
    </>
  );
}

export default withPageAuthRequired(Dashboard, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});

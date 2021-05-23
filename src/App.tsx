import './App.css';
import { useQuery, gql } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './spacex.css'; //litt små css arbeid

interface SpaceXData {
  launch_date_local: string;
  mission_name: string;
  id: string;
  details: string;

  rocket: {
    rocket_name: string;
    rocket_type: string;
  }
  links: {
    video_link: string;
    wikipedia: string;
  }
}

interface SpaceXResult {
  launchesPast: Array<SpaceXData>
}

//graphql query
const LAUNCHESPAST = gql`
  query GetPastLaunches {
    launchesPast(limit: 5, sort: "launch_date_local", order: "desc") {
      mission_name
      links {
        video_link
        wikipedia
      }
      launch_date_local
      details
      id
      rocket {
        rocket_name
        rocket_type
      }
    }
  }
`;

function App() {
  const { loading, data } = useQuery<SpaceXResult>(LAUNCHESPAST);

  return (
    <>
      <div>
        {loading || !data ? <p>Loading...</p> :
          data.launchesPast.map(launche => (
            <div className="spacex">
              <div className="card-deck">
                <div className="card bg-primary">
                  <div className="card">
                    <div className="card-body" key={launche.id}>
                      
                      <h4 className="card-title">{launche.mission_name}</h4>
                      <p className="card-title">{launche.details}</p>
                      <p><b>Rocket Name:</b> {launche.rocket.rocket_name}</p>
                      <p>{launche.launch_date_local}</p>
                      <a href={launche.links.wikipedia} className="btn btn-primary stretched-link">Read More</a>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          ))
        }
      </div>
    </>
  );
}

export default App;
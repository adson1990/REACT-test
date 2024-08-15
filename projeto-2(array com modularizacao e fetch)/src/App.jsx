// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Component } from 'react'
import './App.css'
import { PostCard } from './components/PostCard';

class App extends Component{
  state={
    posts:[]
  };

  componentDidMount() {
    this.loadPosts()
    //.then(response => response.json())
    //.then(posts => this.setState({ posts }))
  }

  loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');

    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);
    
    const postsJson =  await posts.json();
    const photosJson =  await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return {...post, cover: photosJson[index].url }
    });

    this.setState({ posts : postsAndPhotos });
    
  }

  render() {
    const { posts } = this.state;

    return (
      <section className='container'>
      <div className='posts'>
        {posts.map(post => (
          // eslint-disable-next-line react/jsx-key
          <PostCard 
          key={post.id}
          title={post.title}
          body={post.body}
          id={post.id}
          cover={post.cover}/>
        ))}
      </div>
      </section>
    )
  }
}

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App

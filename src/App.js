import { useState } from 'react'
import FirebaseAuthService from './FirebaseAuthService';

import './App.css';
import LoginForm from './components/LoginForm';
import AddEditRecipeForm from './components/AddEditRecipeForm';

function App() {
  const [user, setUser] = useState(null)
  //Whenever there is a change in the user, we will call our custom handler which in this case is simply setState
  FirebaseAuthService.subscribeToAuthChanges(setUser);

  async function handleAddRecipe(newRecipe) {
    try {

      const response = await FirebaseAuthService.createDocument('Recipes', newRecipe);

      //TODO: fetch new recipes from the firestore

      alert(`Sucessfully created a recipe with an ID = ${response.id}`)
    } catch (error) {

      alert(error.message);

    }
  }

  return (
    <div className="App">
      <div className="title-row">
        <h1 className='title'>Recipes App</h1>
        <LoginForm existingUser={user} />
      </div>
      <div className='main'>
        <AddEditRecipeForm handleAddRecipe={handleAddRecipe} />
      </div>
    </div>
  );
}

export default App;

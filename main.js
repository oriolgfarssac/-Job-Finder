let located = true;
let jobtype = true;
let city = "";
let job = "";

const chat = () => {
    let menssage = document.getElementById('text_input').value;
    if(menssage == "" || menssage == " "){
        correctFormat();
    }else{
    let mainContainer = document.getElementById('message_container');
    let container = document.createElement("div");
    container.className = "mymsg";
    let text = document.createElement("p");
    text.innerHTML = menssage;
    container.appendChild(text);
    mainContainer.appendChild(container);
    let menssage2 = document.getElementById('text_input');
    menssage2.value = "";
    if (located == false) {
        city = menssage;
        typeJob();
    } else if (jobtype == false) {
        job = menssage;
        jobtype = true; 
        let result = job + ", " + city; 
        findJob(result);
    }else{
        ai(menssage);
    }
}
};

const firstChat = () =>{
    let mainContainer = document.getElementById('message_container');
    let container = document.createElement("div");
    container.classList = "botmsg";
    let text = document.createElement("p");
    let text2 = document.createElement("p");
    text.innerHTML = "👋 Welcome to our job search platform!<br> 🔍 Looking for the perfect job?  <br> ☑️ You've come to the right place!";
    container.appendChild(text);
    mainContainer.appendChild(container);
}

const primerChat = () => {
    let mainContainer = document.getElementById('message_container');
    let container = document.createElement("div");
    container.classList = "botmsg";
    let text = document.createElement("p");
    text.innerHTML = "🔍 Need help looking for a job?";
    let button = document.createElement("button");
    button.innerHTML = "Yes!";
    button.classList = "chat_button";
    button.onclick = wantJob;
    let button2 = document.createElement("button");
    button2.innerHTML = "No!";
    button2.classList = "chat_button2";
    button2.onclick = noWantJob;
    container.appendChild(text);
    container.appendChild(button);
    container.appendChild(button2);
    mainContainer.appendChild(container);
};

const wantJob = () => {
    let mainContainer = document.getElementById('message_container');
    let inputbar = document.getElementById('text_input');
    let container = document.createElement("div");
    container.classList = "botmsg";
    let text = document.createElement("p");
    text.innerHTML = "Great! To get started, where are you currently 🗺️ located?";
    container.appendChild(text);
    mainContainer.appendChild(container);
    inputbar.placeholder = "Where are you currently 🗺️ located?"
    located = false;
};

const typeJob = () => {
    located = true;
    let mainContainer = document.getElementById('message_container');
    let inputbar = document.getElementById('text_input');
    let container = document.createElement("div");
    container.classList = "botmsg";
    let text = document.createElement("p");
    let text2 = document.createElement("p");
    text.innerHTML = "Nice! " + city + " such a cool place😎!";
    text2.innerHTML = "And tell me, what job are you looking for?";
    container.appendChild(text);
    container.appendChild(text2);
    mainContainer.appendChild(container);
    inputbar.placeholder = "What job are you looking 🕵️ for?"
    jobtype = false;
}

window.onload = function() {
    console.log("Hi! Helloo guyys!" + " What are you doing here?");
    firstChat();
    primerChat();
};


const findJob = async (result) => {
    const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
            query: result,
            page: '1',
            num_pages: '1'
        },
        headers: {
            'X-RapidAPI-Key': 'd2ad0e80cbmsh4c39a5b834eb42ap1d9745jsn6a4511726cb2',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        let array = response.data.data; 
        if(array.length>0){
        for (let i = 0; i < array.length; i++) {
            let mainContainer = document.getElementById('message_container');
            let container = document.createElement("div");
            container.classList = "botmsg";
            let text = document.createElement("p");
            let a = document.createElement("a");
            text.innerHTML = array[i].job_title;
            a.innerHTML = "Apply Here"; 
            a.href = array[i].job_apply_link;
            a.target = "_blank"; 
            a.className = "link";
            container.appendChild(text);
            container.appendChild(a);
            mainContainer.appendChild(container);
        }
        let mainContainer = document.getElementById('message_container');
        let container = document.createElement("div");
        container.classList = "botmsg";
        let text = document.createElement("p");
        let text2 = document.createElement("p");
        text.innerHTML = "You didn't find the job you wanted?";
        text2.innerHTML = "Try searching again with new parameters!";
        container.appendChild(text);
        container.appendChild(text2);
        mainContainer.appendChild(container);
    }else{
        let mainContainer = document.getElementById('message_container');
        let container = document.createElement("div");
        container.classList = "botmsg";
        let text = document.createElement("p");
        let text2 = document.createElement("p");
        text.innerHTML = "We didn't find the job you wanted with those parameters!";
        text2.innerHTML = "Try searching again with other parameters!";
        container.appendChild(text);
        container.appendChild(text2);
        mainContainer.appendChild(container);
    }
    } catch (error) {
        console.error(error);
    }
};

const reset = () =>{
    located = false;
    jobtype = false;
    primerChat();
}

const ai = async (message) => {
    const options = {
        method: 'POST',
        url: 'https://chat-gpt26.p.rapidapi.com/',
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': 'd2ad0e80cbmsh4c39a5b834eb42ap1d9745jsn6a4511726cb2',
          'X-RapidAPI-Host': 'chat-gpt26.p.rapidapi.com'
        },
        data: {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: message
            }
          ]
        }
      };
      
      try {
        const response = await axios.request(options);
        const result = response.data;
        let mainContainer = document.getElementById('message_container');
        let container = document.createElement("div");
        container.classList = "botmsg";
        let text = document.createElement("p");
        text.innerHTML = result.choices[0].message.content;
        container.appendChild(text);
        mainContainer.appendChild(container);
        console.log(response.data)
      } catch (error) {
          console.error(error);
      }
}

const noWantJob = () =>{
    let mainContainer = document.getElementById('message_container');
    let container = document.createElement("div");
    container.classList = "botmsg";
    let text = document.createElement("p");
    text.innerHTML = "No?! Well in that case ask me something else!" ;
    container.appendChild(text);
    mainContainer.appendChild(container);
}

const correctFormat = () =>{
    let mainContainer = document.getElementById('message_container');
    let container = document.createElement("div");
    container.classList = "botmsg";
    let text = document.createElement("p");
    text.innerHTML = "Be careful! You forgot to type before searching!" ;
    container.appendChild(text);
    mainContainer.appendChild(container);
}
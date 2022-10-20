import React, {useState, useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards';
import classNames from 'classnames';

import useStyles from './styles.js';

const alanKey = '807310d6e28ea14fcaeb85f314e91c4d2e956eca572e1d8b807a3e2338fdd0dc/stage';

// for updating the useeffect once the app starts
const App= ()=>{

    const [newsArticles, setNewsArticles] = useState([]);
    const[activeArticle, setActiveArticle] = useState (-1);
    const classes = useStyles();

    useEffect(()=>{
        
        alanBtn({
            key:alanKey,
            onCommand:({command, articles,number})=>{
                if(command === 'newHeadlines'){
                    // if(!articles){
                    //     console.log("Khali");
                    // }
                    // else{
                    //     console.log("Bhara");
                    // }
                    // console.log(articles);
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }else if(command==='highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle +1)
                }else if(command==='open'){
                   const parseNumber = number.length>2 ? wordsToNumbers(number, {fuzzy:true}): number;
                   const article = articles[parseNumber - 1];

                   if(parseNumber > 20){
                    alanBtn().playText('please try that again,')
                   } else if (article){
                     window.open(articles[number].url,'_blank');
                     alanBtn().playText('opening...');
                   }
                   
                }
            }
        })
    },[]);

    return (
        <div>
            <div className= {classes.logoContainer}>
                <img src="https://alan.app/voie/images/previews/preview.jpg" className={classes.alanLogo} alt="alan logo"/>
            </div>
           <NewsCards articles = {newsArticles} activeArticle= {activeArticle}/>
        </div>
    );
}

export default App;
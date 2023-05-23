import genreObj from "../Constants/GenreObj";
import axios from 'axios'

let updatedGenreObj = genreObj;

function fetchReviews() {
    const promises = [];
    for (const genre in updatedGenreObj) {
        const movieArray = updatedGenreObj[genre];
        for (const movie of movieArray) {
            const slug = movie.slug;
            const promise = fetch(`https://agoodmovietowatch.com/_next/data/q8J1SSASgXP7hAooc0Qd5/${slug}.json?filters=${slug}`)
                .then((res) => res.json()).then((response) => {
                    const review = response?.pageProps?.content?.content.replaceAll('<p>','').replaceAll('</p>','');
                    movie.review = review;
                    setTimeout(1000,function(){})
                }).catch(error => {
                    console.log(`Error fetching review for movie ${slug}:`, error);
                });

            promises.push(promise);
        }
    }
    return Promise.all(promises);
}

fetchReviews()
    .then(() => {
        // Process the updated movies object here
        // console.log(JSON.stringify(updatedGenreObj));
        console.log(updatedGenreObj);
    })
    .catch(error => {
        console.error('Error:', error);
    });

export default updatedGenreObj;
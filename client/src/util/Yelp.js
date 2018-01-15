const apiKey = 'pN4w-OgwAeDi2cuuu2zrLfbeWMSQaHl_bB12vVQ1qxNlo7FSGMxIaHFhaSKXALHQCpZaQIOYc961wqkzsJykRuJQYxhqXxpnXl945WDexqx3Jr4jnpasQaYH0fBXWnYx';

const Yelp = {
  search(term, location, sortBy) {
    return fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=' + term + '&location=' + location +'&sort_by=' + sortBy +'&GoodForKids', {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => {
          return {
            id: business.id,
            url:business.url,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count
          };
        });

      }
    });
  }
};

export default Yelp;


import 'whatwg-fetch'

const apiKey = 'CpC9do2QS57nwalKzfB299QuNdMhneSO6UzIz3-y92zL9N7YEmlNPY2E8GbS_iVjuzxVATOEXnKah5sWgXb0rlvs02yaW5dyd8zaoTdkWyTgKXVXp1wf3zoxM3GwW3Yx';
const Yelp = {
    search (term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
            { headers: {
                Authorization: `Bearer ${apiKey}`
                }
            }
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.businesses) {console.log(jsonResponse);
                return jsonResponse.businesses.map(business => {
                         return {id: business.id,
                            imageSrc: business.image_url,
                            name: business.name,
                            address: business.location.address_1,
                            city: business.location.city,
                            state: business.location.state,
                            zipCode: business.location.zip_code,
                            category: business.categories.title,
                            rating: business.rating,
                            reviewCount: business.review_count,
                            coordinates: `https://www.google.pl/maps/@${business.coordinates.latitude},${business.coordinates.longitude},20z`,
                            url: business.url
                        };
                    });
            } else {
                return [];
            }
        });
    }
};
export default Yelp;


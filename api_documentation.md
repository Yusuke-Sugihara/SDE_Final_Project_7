# Project API Documentation
This documentation provides an overview of the APIs used in the project TravelAdvisor, including Google Maps (Maps Javascript API and Places API), Travel Advisor (Rapid API) and Openweather API. 

## Google Maps API

### Maps Javascript API
The Maps Javascript API allows to embed Google Maps on the web pages. It enables features like displaying maps, adding markers, and customizing map appearance. 

More details can be found on [GoogleMapsAPI](https://console.cloud.google.com/apis/library?project=traveladvisor-407217). 

### Usage
To integrate the Maps Javascript API into the project, following script is included in the `<head>` of index.html file:

```html 
<script async defer
src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap">
</script>
```

Replace YOUR_GOOGLE_MAPS_API_KEY with the relevant Google Maps API key.
 

## Travel Advisor API (Rapid API)

The Travel Advisor API, sourced through the Rapid API platform, plays a pivotal role in enriching the project with diverse travel-related data. This encompasses information regarding points of interest, hotels, restaurants, and user-generated reviews. 

More details can be found on [RapidAPI Travel Advisor](https://rapidapi.com/apidojo/api/travel-advisor/).

### Integration Process
To effectively leverage the Travel Advisor API, HTTP requests are directed to specific endpoints tailored to the project's requirements:

-Points of Interest: https://travel-advisor.p.rapidapi.com/locations/search

-Hotels: https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng

-Restaurants: https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng

Notably, these requests necessitate the inclusion of essential headers such as X-RapidAPI-Host and X-RapidAPI-Key. 

The detailed integration of the API keys can be found inside the root folder-src-api-index.js.

A code snippet for the Google Maps API is as follows:

```javascript
import axios from "axios";

// Get places by bounds receives the 'type', 'sw' object, 'ne'object and 'source' for effect cancellation as parameter for endpoint call
export const getPlacesByBounds = async (type, sw, ne, source) => {
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng
          },
          headers: {
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
            'X-RapidAPI-Key': import.meta.env.VITE_TRAVEL_API_KEY
          }
        }, { cancelToken: source.token });

        // Data is returned once resolved
        return data;

    } catch (error) {
        // Error Handling
        if (axios.isCancel(error)) {
          console.log('axios Call Cancelled!');
        } else {
          throw error;
        }
    }
}

// Get Places by Latitude and longitude, receives 'type', 'lat', 'lng', some 'params' and source for effect cleanup and error handling as parameter to endpoint call
export const getPlacesByLatLng = async (type, lat, lng, params, source) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-by-latlng`, {
      params: {
        latitude: lat,
        longitude: lng,
        ...params
      },
      headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': import.meta.env.VITE_TRAVEL_API_KEY
      }
    }, { cancelToken: source.token });

    // Data is returned once resolved
    console.log(data);
    return data;
  } catch (error) {
    if (axios.isCancel(error)){
      console.log('axios Call Cancelled!');
    } else {
      throw error
    }
  }
}

// Get Place details RTCRtpReceiver, 'type', 'location_id' and 'source' as paramter to endpoint call
export const getPlaceDetails = async (type, location_id, source) => {
  try {
    const { data } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/get-details`, {
      params: {
        location_id: location_id
      }, 
      headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': import.meta.env.VITE_TRAVEL_API_KEY
      }
    }, { cancelToken: source.token });

    // Data is returned once resolved
    return data;
  } catch (error) {
    if (axios.isCancel(error)){
      console.log('axios Call Cancelled!');
    } else {
      throw error
    }
  }
}

// Get Place Review received the 'location_id' and 'source' as paramters for endpoint call
export const getPlaceReviews = async (location_id, source) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/reviews/list`, {
      params: {
        location_id: location_id,
        limit: 20
      },
      headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': import.meta.env.VITE_TRAVEL_API_KEY
      }
    }, { cancelToken: source.token });

    // Data is returned once resolved
    return data;
  } catch (error) {
    if(axios.isCancel(error)) {
      console.log('axios Call Cancelled');
    } else {
      throw error;
    }
  }
}

// Search Place recieves 'location', some 'params' and 'source' as a parameters for endpoint call
export const searchPlaces = async (location, params, source) => {
  try {
    const { data: { data } } = await axios.get('https://travel-advisor.p.rapidapi.com/locations/search', {
      params: {
        query: location,
        ...params
      },
      headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': import.meta.env.VITE_TRAVEL_API_KEY
      }
    }, { cancelToken: source.token })

    // Data is returned once resolved
    return data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('axios Call Cancelled');
    } else {
      throw error;
    }
  }
}
```

## Open Weather API (Rapid API)
The OpenWeatherMap API provides the real time weather information for the locations accross the globe. 

More details can be found on [RapidAPI Open Weather](https://rapidapi.com/worldapi/api/open-weather13/).

### Integration process
The integration of the OpenWeatherMap API involves makine HTTP request to the following endpoint:

https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${lng}` 

Based on the latitude and longitude of the location/target city for which the weather information is sought, the information is generated.

``` javascript
// Get Weather receives 'lat' and 'lng' as parameters for endpoint call
export const getWeather = async (lat, lng) => {
  try {
    const response = await axios.get(`https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${lng}`, {
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_TRAVEL_API_KEY,
        'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
```

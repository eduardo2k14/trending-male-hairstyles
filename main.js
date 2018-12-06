function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

var getHairRecords = function() {
$.getJSON('https://api.airtable.com/v0/appwSTzQIEFD9Gpeg/Hairstyles?api_key=keysEParbhvhel5Xm',
  function(airtable){
    var html = [];
    $.each(airtable.records, function(index, record) {
      var hairstyles = record.fields['Hairstyles'];
      var photos = record.fields['Image'];
      var info = record.fields['Description'];
      // console.log(photos);
      html.push(hairstylesView(hairstyles, photos, info));
    });
    $('.list').append(html);
  }
);
}

var getAllRecords = function() {
$.getJSON('https://api.airtable.com/v0/appwSTzQIEFD9Gpeg/Barbershops?api_key=keysEParbhvhel5Xm',
  function(airtable){
    var html = [];
    $.each(airtable.records, function(index, record) {
      var id = record.id;
      var barbershops = record.fields['Barbershops'];
      var photos = record.fields['Image'];
      var rating = record.fields['Rating'];
       html.push(barbershopsView(id, barbershops, photos, rating));
    });
    $('.list-two').append(html);
  }
);
}

var getOneRecord = function(id) {
$.getJSON(`https://api.airtable.com/v0/appwSTzQIEFD9Gpeg/Barbershops/${id}?api_key=keysEParbhvhel5Xm`,
  function(record){
    var html = [];
      var barbershops = record.fields['Barbershops'];
      var photos = record.fields['Image'];
      var address = record.fields['Location'];
      var phone = record.fields['Contact'];
      var price = record.fields['Price'];
      var rating = record.fields['Rating'];
      var appointments = record.fields['Walk-ins'];
      var website = record.fields['Yelp'];
      html.push(detailView(barbershops, photos, address, phone, price, rating, appointments, website));
    $('.list-three').append(html);
  }
);
}


/*var getOneRecord = function(id) {
    $.getJSON(`https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations/${id}?api_key=key2m8VgwGT2iztad`,
      function(record){
        var html = [];
        var name = record.fields['Name'];
        var address = record.fields['Address'];
        var rating = record.fields['Rating'];
        var picture = record.fields['Pictures'];
        var cost = record.fields['Cost'];
        var type = record.fields['Type'];
        html.push(detailView(name, address, rating, picture, cost, type ));
        $('body').append(html);
      }
    );
  }*/


/*var hairstylesView = function(hairstyles, photos, info) {
    return `
    <div class="card text-white bg-primary mb-3" style="height: 500px; max-width: 18rem; display: inline-flex;">
        <div class="card-body">
        ${photos ? `<img src="${photos[0].url}">` : ``}
        <h5 class="card-title">${hairstyles}</h5>
        <div class="left">
            <ul>
             <li><strong>Details</strong>
               <ul>
                <li>${info}</li>
                </ul>
                </li>
                </ul>
      </div>
    </div>   
    `;*/
    var hairstylesView = function(hairstyles, photos, info) {
        return `
        <div class="card text-white bg-primary mb-3" style="height: 540px; max-width: 20rem; display: inline-flex; margin-left: 20px;">
            <div class="card-body">
            ${photos ? `<img src="${photos[0].url}">` : ``}
            <h5 class="card-title">${hairstyles}</h5>
            <div class="left">
            <ul>
             <li><strong>Details</strong>
               <ul>
                <li>${info}</li>
                </ul>
                </li>
                </ul>
      </div>
        </div>  
        `;
    
    /*<a href="#" data-toggle="popover" class="card-text"${info}" data-content="Some content inside the popover">Details</a>*/
    /*<p class="card-text">"${info}</p>*/
    
}
var barbershopsView = function(id, barbershops, photos, rating) {
    return `
    <div class="card text-white bg-danger mb-3" style="height: 540px; max-width: 20rem; display: inline-flex; margin-left: 70px;">
            <div class="card-body">
        ${photos ? `<img src="${photos[0].url}">` : ``}
        <h5 class="card-title">${barbershops}</h5>
        <p class="card-text">Rating</p>
        <p><u><strong>${rating}</p></u></strong>
        <button type="button" class="btn btn-dark"><a href="index.html?id=${id}">Details</button></a>
     </div>
    </div>
    `;
  }

/*<div class="card text-white bg-danger mb-3" style="height: 540px; max-width: 20rem; display: inline-flex; margin-left: 20px;">
            <div class="card-body">
        ${photos ? `<img src="${photos[0].url}">` : ``}
        <h5 class="card-title">${barbershops}</h5>
        <p class="card-text">${rating}</p>
        <button type="button" class="btn btn-dark">Details</button>
  </div>*/


  /*<div class="card text-white bg-danger mb-3" style="height: 500px; max-width: 18rem; display: inline-flex;"></div>
        <div class="card-body">
  /*<img class="card-img-top" src="${photos[0].url}">use this for image but didn't work*/

  var detailView = function(barbershops, photos, address, phone, price, rating, appointments, website) {
    return `
    <div class="shops">
    </div>
    <div class="layout">
    ${photos ? `<img src="${photos[0].url}">` : ``}
    <div class="card border-danger mb-3" style="max-width: 18rem;">
    <div class="card-header"><h3><strong>${barbershops}</strong></h3>
    <div class="card-body text-danger">
    <p class="card-text">
    <p><u><strong>Address</strong></u></p>
    <p>${address}</p>
    <p><u><strong>Contact</strong></u></p>
    <p>${phone}</p>
    <p><u><strong>Price</strong></u></p>
    <p>${price}</p>
    <p><u><strong>Rating</strong></u></p>
    <p>${rating}</p>
    <p><u><strong>Appointments</strong></u></p>
    <p>${appointments}</p>
    <p><u><strong>Website</strong></u></p>
    <p>${website}</p>
    </div>
    </div>
    </div>
    `;
  } 



  var id = getParameterByName('id');
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
  getHairRecords();
}
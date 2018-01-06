// Pyramide des âges - Ludivine Stofer, fin 2017

// Définition de la fenêtre et du cadre
let largeur = window.innerWidth;
let hauteur = window.innerHeight;

let cadre = d3.select("#graphic")
    .append("svg")
    .attr("style", "width: 800px; height: 480px;");


// Création des dictionnaires vides
let popdataH = {},
    popdataF = {};

// Maximum de la variable population qui permettra de déterminer la largeur du graphique.
let popMax = {h: 0, f: 0};

// Création d'une APP qui stocke toutes les méthodes
APP = {};

// Initialiser le script de la page
APP.main = function(){
  APP.drawGraph();
  APP.updateGraph();
  APP.sliderEvent();
};

// Création de la letiable année contenant une liste des années en nombre
let years = Object.keys(data.features);
years = $.map(years, function(y){ return parseInt(y); });
let yearMin = years[0];
let yearMax = years[years.length-1];

// Définition de l'année affichée
let currentYear = 2016;



// Création d'une fonction qui appelle les données d'une année
APP.dataForYear = function(year){
  let feats = data.features[year];
  let popH = [], popF = [];
  // Boucle pour les données
  for (let j=0; j < feats.length; j++){
    let y = feats[j];
    // Séparation des données en fonction du sexe
    if (y.sex == 1){
      popH.push(y);
      popMax.h = Math.max(popMax.h, y.population);
    } else {
      popF.push(y);
      popMax.f = Math.max(popMax.f, y.population);
    }
  }
  return {h:popH, f:popF};
}

// Boucle qui applique la fonction pour toutes les années
for (i=0; i < years.length; i++) {
  let y = years[i];
  let dy = APP.dataForYear(y);
  popdataH[y] = dy.h;
  popdataF[y] = dy.f;
};

// Définition des valeurs maximales pour toutes les années.
popMax = Math.max(popMax.h, popMax.f);

// Paramètre permettant de mettre l'histogramme dans le bon sens (jeune en bas)
let n = Math.max(popdataH[currentYear].length, popdataF[currentYear].length);

// Définition de la largeur maximale
let widthMax = 350;

// Paramètre qui permet de mettre à l'échelle l'histogramme.
let factScale = popMax / widthMax;

let S = {};
// Création d'une fonction qui dessine les graphes.
APP.drawGraph = function(){


// Histogramme des femmes
  S.groupeBar_f = cadre.append('g');
  let barF = S.groupeBar_f.selectAll(".female")
  .data(popdataF[currentYear])
  .enter()
    .append('rect')
    .attr('class', 'female')
    .attr('width', 0) // mise à l'échelle
    .attr('height', 3)
    .attr('x', 420)
    .attr('y', function(d,i){ return (n-i)*4 ; }) // Définition de l'écartement entre les barres et du sens
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

// Histogramme des hommes
  S.groupeBar_h = cadre.append('g');
  let barH = S.groupeBar_h.selectAll(".male")
      .data(popdataH[currentYear])
      .enter()
        .append('rect')
        .attr('class', 'male')
        .attr('width', 0)
        .attr('height', 3)
        .attr('x', function(d,i){ return 370 - d.population / factScale; }) // Symétrie de l'histogramme
        .attr('y', function(d,i){ return (n-i)*4; }) // Définition de l'écartement entre les barres et du sens
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);
};

let transitionDuration = 500;

// Fonction qui permet de recharger/redessiner le graphique
APP.updateGraph = function(){
  let t = d3.transition()
      .duration(transitionDuration);

  let bars = S.groupeBar_f.selectAll(".female")
    .data(popdataF[currentYear])
    .transition(t)
    .attr('width', function(d){ return d.population / factScale; }); // mise à l'échelle

  // Histogramme des femmes
  S.barF = S.groupeBar_h.selectAll(".male")
        .data(popdataH[currentYear])
        .transition(t)
          .attr('width', function(d){ return d.population / factScale; })
          .attr('x', function(d,i){ return 370 - d.population / factScale; }); // Symétrie de l'histogramme
  APP.printYear();
}

// Création des axes
// Axe X1
let scaleX_f = d3.scaleLinear()
        .domain([0, popMax])
        .range([widthMax,0])

let xAxis1 = d3.axisBottom(scaleX_f)
                .tickValues(d3.range(0, Math.ceil(popMax /10000)* 10000 + 1, 10000))
                .tickFormat(d3.format("10"));

cadre.append("g")
      .attr('transform', 'translate(20, 440)')
      .attr("class", "axis")
      .call(xAxis1);

 // Axe X2

 let scaleX_h = d3.scaleLinear()
                   .domain([0, popMax])
                   .range([0, widthMax])

 let xAxis2 = d3.axisBottom(scaleX_h)
                 .tickValues(d3.range(0, Math.ceil(popMax / 10000) * 10000 + 1, 10000))
                 .tickFormat(d3.format("10"));

 cadre.append("g")
      .attr('transform', 'translate(420, 440)')
      .attr("class", "axis")
      .call(xAxis2)

// Axe Y
  let scaleY = d3.scaleLinear()
          .domain([0, n])
          .range([n*4, 0])

  let yAxis = d3.axisLeft(scaleY)

  cadre.append("g")
     .attr("transform", `translate(410,0)`)
     .attr("class", "axisY")
     .call(yAxis)

// Fonction qui affiche l'année représentée
APP.printYear = function(){
  let year = document.getElementById('year');
  year.innerHTML = currentYear;
}




// Fonction qui permet de naviguer avec le slider
APP.sliderEvent = function(){
  slider = $('.yearChange').change(function(e){
    let y = $('#slider1').val();
    currentYear = y;
    APP.updateGraph();
    });
}

// Boutons années
$('.boutons input').click(function(){
  APP.updateGraph(currentYear = $(this).val());
  // Liaison avec le slider
  $('#slider1').val(currentYear);
});

// Bouton PLAY
$('span#play').click(function(){
  APP.playing = true;
  APP.play();
  // Le bouton disparait lorsqu'il est pressé
  $('span#pause').css('display', 'inline');
  $('span#play').css('display', 'none');
});

// Bouton PAUSE
$('span#pause').click(function(){
  APP.pause();
  // Le bouton disparait lorsqu'il est pressé
  $('span#pause').css('display', 'none');
  $('span#play').css('display', 'inline');
});

// Mise en place par défaut de l'état PAUSE
APP.playing = false;

// Création de la fonction PLAY
APP.play = function(){
  transitionDuration = 300;
  if (APP.playing){
    idxYear = years.indexOf(parseInt(currentYear));
    idxYear += 1;
    if (idxYear >= years.length) idxYear = 0;
    currentYear = years[idxYear];
    APP.updateGraph();
    window.setTimeout(APP.play, 300);
  }
}

// Création de la fonction PAUSE
APP.pause = function(){
  APP.playing = false;
  transitionDuration = 500;
}

let toolTip = d3.select('body')
  .append('div')
  .attr("class", "tooltip")
  .style("opacity", 0)

//Fonction qui met la barre plus transparente et qui affiche le tooltip lors du passage de la souris
function handleMouseOver(d, i){
  d3.select(this)
    .attr("opacity", "0.3");
    if (d.sex == 1){
      toolTip.html(`Age : ${i} <br> Population : ${d.population}`)
        .style("left", `${d3.event.pageX-200}px`)
        .style("top", `${d3.event.pageY+0}px`)

        .style ("color", "#6473aa");
    } else {
      toolTip.html(`Age : ${i} <br> Population : ${d.population}`)
        .style("left", `${d3.event.pageX+80}px`) // Eloignement de gauche à droite
        .style("top", `${d3.event.pageY+0}px`) // Eloignement de haut en bas
        .style ("color", "#890883");
    }


  toolTip.transition()
    .duration(100)
    .style("opacity", 0.9);
  }

// Fonction qui remet l'opacité et le tooltip à zéro une fois que la souris est passé
function handleMouseOut(d){
  d3.select(this)
    .attr("opacity", "1")
  toolTip.transition()
         .duration(500)
         .style("opacity", 0);
}

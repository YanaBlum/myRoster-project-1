const source = $('#roster-template').html()
const template = Handlebars.compile(source)

const render = function (roster) {
  const newHtml = template({ roster })
  $('#roster').empty().append(newHtml)
}



$("#getRoster").on('click', function(){
  const input = $('#input').val().toLowerCase()
  $.get(`/api/teams/${input}`, function (response){
    render(response)
  })
})
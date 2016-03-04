 function Redirect() {
 	alert("Your comment was submitted successfully");
}
function method(){
				   
  alert("Hello There");
  sleep(13222);
  function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

			   }
/*code to sort the tables*/
    $('th').click(function(){
    var table = $(this).parents('table').eq(0)
    var rows = table.find("tr:not(:has('th'))").toArray().sort(comparer($(this).index()))
    this.asc = !this.asc
    if (!this.asc){rows = rows.reverse()}
    for (var i = 0; i < rows.length; i++){table.append(rows[i])}
})
function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
    }
}
function getCellValue(row, index){ return $(row).children('td').eq(index).html() }

/*code to apply a filter*/
$('table').each(function(){
    var table = $(this)
    var header = table.find('th').length
    var rowfilter = $('<tr>').insertAfter($(this).find('th:last()').parent())
    for (var i = 0; i < header; i++){
        rowfilter.append($('<th>').append($('<input>').attr('type','text').keyup(function(){
	        table.find('tr').show()
            rowfilter.find('input[type=text]').each(function(){
	            var index = $(this).parent().index() + 1
	            var filter = $(this).val() != ''
	            $(this).toggleClass('filtered', filter)
	            if (filter){
	                var el = 'td:nth-child('+index+')'
	                var criteria = ":contains('"+$(this).val()+"')"
	                table.find(el+':not('+criteria+')').parent().hide()
	            }
            })
        })))
    }
    rowfilter.append($('<th>').append($('<input>').attr('type','button').val('Clear Filter').click(function(){
        $(this).parent().parent().find('input[type=text]').val('').toggleClass('filtered', false)
        table.find('tr').show()
    })))
})		   
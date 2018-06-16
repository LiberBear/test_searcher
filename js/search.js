$(window).on('load', function(){
$('#search-key').keyup(function(){
    var searchField = $('#search-key').val().trim();
    var type = $('#search_concept').text();
    var output = '';
    var regex = new RegExp(searchField, "i");
    var count = 0;

    function replacer($strToReplace) 
    {
        return $strToReplace.replace(/\\r\\n\\\\r\\n\\|\\r\\n\\/g,"");
    }

    $.getJSON('/resource/full.json', function(data) {
      $.each(data.items, function(key, val){
        if (type === 'Р’СЃРµ'){
            if ((replacer(val.q.trim()).search(regex) != -1)) {
              if(count%2 === 0){
                output += '<div class="alert alert-primary" role="alert">';
                output += '<p><strong>'+replacer(val.q.trim())+'</strong></p>';
                output += '<hr>';
                output += '<p class="mb-0">'+replacer(val.a.trim())+'</p>';
                output += '</div>';
              }
              else{
                output += '<div class="alert alert-secondary" role="alert">';
                output += '<p><strong>'+replacer(val.q.trim())+'</strong></p>';
                output += '<hr>';
                output += '<p class="mb-0">'+replacer(val.a.trim())+'</p>';
                output += '</div>';
                
              }
    
              count++;
              if(count > 10){
                return false;
              }
        }
        }
        else if ((replacer(val.q.trim()).search(regex) != -1) && val.type === type) {
          if(count%2 === 0){
            output += '<div class="alert alert-primary" role="alert">';
            output += '<p><strong>'+replacer(val.q.trim())+'</strong></p>';
            output += '<hr>';
            output += '<p class="mb-0">'+replacer(val.a.trim())+'</p>';
            output += '</div>';
          }
          else{
            output += '<div class="alert alert-secondary" role="alert">';
            output += '<p><strong>'+replacer(val.q.trim())+'</strong></p>';
            output += '<hr>';
            output += '<p class="mb-0">'+replacer(val.a.trim())+'</p>';
            output += '</div>';
            
          }

          count++;
          if(count > 6){
            return false;
          }
        }
      });
      if(count===0){
        output += '<h3>РќРёС‡РµРіРѕ РЅРµ РЅР°Р№РґРµРЅРѕ</h3>';
        output += '<p>РџРѕРїСЂРѕР±СѓР№ РїСЂРѕРІРµСЂРёС‚СЊ Р·Р°РїСЏС‚С‹Рµ Рё РїСЂРѕС‡РёРµ РјРµР»РѕС‡Рё</p>'
      }
      if(searchField === ''){
        output = '<h6>РџСѓСЃС‚РѕР№ Р·Р°РїСЂРѕСЃ ?!</h6>'
      }
      $('#results').html(output);
    }); 
});
});
$('#clear').click(function(){
     $('#search-key').val('');
});
$('#search-key').keypress(function(e) {
    if(e.which == 13) {
        $('#search-key').val('');
    }
});
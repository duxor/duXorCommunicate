/*#
 ### Autor: Dusan Perisci
 ### Home: dusanperisic.com
 ###
 ### Napomena: 	Klasa je pisana kao dodatak Laravel framework-a
 ### ------------------------------------------------------------------
 ### Primjer:
 ### HTML:  <div id="poruka" style="display: none"></div>
 ###        <div id="wait" style="display:none"><center><i class='icon-spin6 animate-spin' style="font-size: 350%"></i></center></div>
 ###        <div id="hide">
 ###            {!!Form::hidden('_token',csrf_token())!!}
 ###            {!!Form::text('prezime',null,['class'=>'form-control'])!!}
 ###            {!!Form::text('ime',null,['class'=>'form-control'])!!}
 ###            {!!Form::button('<span class="glyphicon glyphicon-save"></span> Sačuvaj',['class'=>'btn btn-lg btn-primary','onclick'=>'duXorCommunicate.posalji("/url","podaciID","poruka","wait","hide")'])!!}
 ###        </div>
 ###
 ### LARAVEL metoda:
 ### 	public function postTest(){
 ###        $podaci=json_decode(Input::get('podaci'));
 ###		return json_encode(['msg'=>'prezime='.$podci->prezime.' ime='.$podaci->ime,'check'=>1]);
 ###	}
 ### VARIJABLE:
 ### url = adresa kojoj se prosledjuju podaci
 ### podaciID = promjenjiva koja sadrzi ID elementa koji obuhvata sve input elemente za prenos podataka, ukljucujuci i _token=csrf_token()
 ### poruka = ID elementa u kome ce da se ispisuje poruka
 ### wait = ID elementa koji sadrzi wait animaciju
 ### hide = ID elementa ciji sadrzaj treba da se sakrije dok je wait aktivan
 ###
*/
var duXorCommunicate = {
    posalji: function(url,podaciID,poruka,wait,hide){
        var podaci=this.podaci('',null,podaciID,{});
        $('#'+hide).css('display','none');
        $('#'+wait).fadeToggle();
        $.post(url,
            {
                _token:podaci['_token'],
                podaci:JSON.stringify(podaci)
            },
            function(data){
                data=JSON.parse(data);
                $('#'+poruka).html('<div class="alert alert-'+ (data['check']?'success':'danger') +'" role="alert">'+data['msg']+'</div>');
                $('#'+wait).fadeToggle();
                $('#'+poruka).fadeToggle('slow');
                window.setTimeout(function(){
                    $('#'+poruka).fadeToggle('slow');
                    $('#'+hide).fadeToggle('slow')
                },5000);
            }
        );
    },
    podaci:function(i,inputi,podaciID,podaci){
        if(inputi==null) {
            var inputi = $('#' + podaciID + ' :input');
            i = inputi.length - 1;
        }
        if(inputi[i].name) podaci[inputi[i].name]=inputi[i].value;
        if(i==0) return podaci;
        return this.podaci(i-1,inputi,null,podaci);
    },
    proslijedi:function(url,token,podaci){
        $.post(url,{
            _token:token,
            podaci:JSON.stringify(podaci)
        },function(data){
            return true;
        });
    },
    proslijediSaPrikzom:function(url,token,podaci,poruka,wait,hide){
        $('#'+hide).css('display','none');
        $('#'+wait).fadeToggle();
        $.post(url,{
            _token:token,
            podaci:JSON.stringify(podaci)
        },function(data){
            data=JSON.parse(data);
            $('#'+poruka).html('<div class="alert alert-'+ (data['check']?'success':'danger') +'" role="alert">'+data['msg']+'</div>');
            $('#'+wait).fadeToggle();
            $('#'+poruka).fadeToggle('slow');
            window.setTimeout(function(){
                $('#'+poruka).fadeToggle('slow');
                $('#'+hide).fadeToggle('slow')
            },5000);
        });
    }
}
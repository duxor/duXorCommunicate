# duXorCommunicate


Klasa je pisana kao dodatak Laravel framework-a, za potrebe aktivne komunikacije sa php skriptama kroz jQuery.

# Detaljno objašnjenje je u pripremi, ispod je naveden samo osnovni primjer korištenja!

**HTML**  

```html
<div id="poruka" style="display: none"></div>
	<div id="wait" style="display:none"><center><i class='icon-spin6 animate-spin' style="font-size: 350%"></i></center></div>
	<div id="hide">
		{!!Form::hidden('_token',csrf_token())!!}
		{!!Form::text('prezime',null,['class'=>'form-control'])!!}
		{!!Form::text('ime',null,['class'=>'form-control'])!!}
		{!!Form::button('<span class="glyphicon glyphicon-save"></span> Sačuvaj',['class'=>'btn btn-lg btn-primary','onclick'=>'duXorCommunicate.posalji("/url","podaciID","poruka","wait","hide")'])!!}
	</div>
```
**Laravel metoda*
```php
public function postTest(){
	$podaci=json_decode(Input::get('podaci'));
	return json_encode(['msg'=>'prezime='.$podci->prezime.' ime='.$podaci->ime,'check'=>1]);
}
```
**Varijable**
 * url = adresa kojoj se prosledjuju podaci
 * podaciID = promjenjiva koja sadrzi ID elementa koji obuhvata sve input elemente za prenos podataka, ukljucujuci i _token=csrf_token()
 * poruka = ID elementa u kome ce da se ispisuje poruka
 * wait = ID elementa koji sadrzi wait animaciju
 * hide = ID elementa ciji sadrzaj treba da se sakrije dok je wait aktivan

# Autor

> # *Broje se samo rezultati!*
> Dušan Perišić
> [dusanperisic.com](https://dusanperisic.com) 

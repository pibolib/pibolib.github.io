extends TileMap

var framescale = 5

func _ready():
	for i in 400:
		var vertical = floor(i/17)
		set_cell(i%17,vertical,i%4)
		if randi()%16 == 0:
			set_cell(i%17,vertical,get_cell(i%17,vertical)+4)

func _process(delta):
	scale.x = max(2,5*(get_viewport().size.x/1920))
	scale.y = scale.x
	if framescale != scale.x:
		print(scale.x)
		framescale = scale.x

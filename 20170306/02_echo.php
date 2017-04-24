
<?php
    echo "我是xxxx, 现在在xx校区的几班学习xx科目";
?>

<p>
		请选择出生年份：
		<select name="" id="">
			<?php
				for($i = 1930 ; $i <= 2016 ; $i++){
			?>
				<option><?php echo $i; ?></option>
			<?php
				}
			?>
		</select>
	</p>
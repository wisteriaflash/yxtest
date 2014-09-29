<?php
	// header('Content-type:text/json'); 
	// $json= '{"succ": true,"msg": "发送请求成功", "data": [{"name":0}]}';
	// echo $json;

	
	$arr = array(
			"succ" => true,
			"msg" => "提示信息",
			"num" => 1231,
			"pd_num" => 3,
			// 用于拼HTML, 或者直接输出HTML
			"data" => array (
					array("pd_url" => "#1"),
					array("pd_name" => "我是商品名"),
					array("pd_price" => "5999.00"),
					array("pd_old_price" => "20.00"),
					array("pd_discount" => "3.5折")
				)
		);
	$arr1 = array(
		'content' => array(
				'info1' => 'test'
			),
		'errorCode' => '0',
		'errorMsg' => '阿偶，出错了o(╯□╰)o'
	);
	$str = '{"content":{"info1":"test"},"errorCode":"0","errorMsg":""}';
	echo json_encode($arr1);
?>

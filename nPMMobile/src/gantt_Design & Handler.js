// ����� nPM_git_hurb Ȩ������ �ּ� ����
var github_Homepage = Ti.UI.createWebView({

	top : 50,
	url : 'http://github.com/nPMbynPM/nPM',
	width : 'auto',
	height : 'auto'
});

//����� nPM_gantt ��ư ����
var gantt_Button = Titanium.UI.createButton({

	color : '#000',
	selectedColor : '#fff',
	backgroundImage : 'nPMMobile_Image/gantt_Icon.png',
	top : 430,
	width : 100,
	height : 100,
	left : 80
	//	right:200

});

//����� nPM_gantt Label ����
var gantt_Label = Titanium.UI.createLabel({
	color : '#999',
	text : '��Ʈ��Ʈ',
	font : {
		fontSize : 25,
		fontFamily : 'Helvetica Neuw'
	},
	left : 90,
	top : 535,
	width : 'auto'
});

//gantt_Button Ŭ�� �� �߻��ϴ� �̺�Ʈ �ڵ鷯
gantt_Button.addEventListener('click', function(e) {
	/*
	 gantt_Homepage.addEventListener('load', function(e)
	 {});
	 */
	top_View.show();
	main_Win.add(top_View);

	gantt_Homepage.show();
	main_Win.add(gantt_Homepage);
});

main_Win.add(gantt_Button);
main_Win.add(gantt_Label);
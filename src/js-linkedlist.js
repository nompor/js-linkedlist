//LinkedList�N���X
var LinkedList = function() {
	this._length = 0;
	for (var i = 0; i < arguments.length; i++) {
		this.addLast(arguments[i]);
	}
}
 
//�v���p�e�B
Object.defineProperties(LinkedList.prototype, {
	length: { get: function() { return this._length; } },
	first: { get: function() { if ( this._first ) {return this._first.element} else {return null;} } },
	last: { get: function() { if ( this._last ) {return this._last.element} else {return null;} } }
});
 
//�Ō�̗v�f���폜����
LinkedList.prototype.removeLast = function() {
	if (!this._last) { return null; }
	var element = this._last.element;
	if (this._last.prev) {
		 this._last = this._last.prev;
		 this._last.next = null;
	} else {
		 this._first = this._last = null;
	}
	this._length--;
	return element;
};
 
//�ŏ��̗v�f���폜����
LinkedList.prototype.removeFirst = function() {
	if (!this._first) { return null; }
	var element = this._first.element;
	if (this._first.next) {
		 this._first = this._first.next;
		 this._first.prev = null;
	} else {
		 this._first = this._last = null;
	}
	this._length--;
	return element;
};
 
//�Ō�ɗv�f��ǉ�����
LinkedList.prototype.addLast = function(val) {
	var entry = { element: val };
	if (!this._first) {
		this._first = entry;
	} 
	if (this._last) {
		entry.prev = this._last;
		this._last.next = entry;
	}
	this._length++;
	this._last = entry;
};
 
//�ŏ��ɗv�f��ǉ�����
LinkedList.prototype.addFirst = function(val) {
	var entry = {
		element:val
	};
	if (!this._last) { 
		this._last = entry;
	}
	if (this._first) {
		this._first.prev = entry;
		entry.next = this._first;
	}
	this._length++;
	this._first = entry;
};
//Array�݊��֐��Q
LinkedList.prototype.push = function(val) {
	this.addLast(val);
};
LinkedList.prototype.pop = function() {
	return this.removeLast();
};
LinkedList.prototype.shift = function() {
	return this.removeFirst();
};
LinkedList.prototype.unshift = function(val) {
	this.addFirst(val);
};
 
//�v�f�̑S�폜
LinkedList.prototype.clear = function() {
	this._first = this._last = null;
	this._length = 0;
};
 
//���������֐�
LinkedList.prototype.forEach = function(fn) {
	var it = this.iterator();
	var i = 0;
	while( it.hasNext() ) fn(it.next(),i++);
};
 
//�t���������֐�
LinkedList.prototype.forEachReverse = function(fn) {
	var it = this.descendingIterator();
	var i = this.length;
	while( it.hasNext() ) fn(it.next(),--i);
};
//�����I�u�W�F�N�g���擾����i�擾��Ƀ��X�g����֎~�j
LinkedList.prototype.iterator = function() {
	return this.__iteratorBase(this._first, function(){
		var val = this._next.element;
		this._now = this._next;
		this._next = this._next.next;
		return val;
	});
};
//�t�����I�u�W�F�N�g���擾����i�擾��Ƀ��X�g����֎~�j
LinkedList.prototype.descendingIterator = function() {
	return this.__iteratorBase(this._last, function(){
		var val = this._next.element;
		this._now = this._next;
		this._next = this._next.prev;
		return val;
	});
}
LinkedList.prototype.__iteratorBase = function(start, nextFunc) {
	return {
		_next:start
		,_now:null
		,_me:this
		,next:nextFunc
		,hasNext:function(){
			return this._next != null;
		}
		,remove:function(){
			var cur = this._now;
			var isP = cur.prev != null;
			var isN = cur.next != null;
			if ( isP && isN ) {
				cur.prev.next = cur.next;
				cur.next.prev = cur.prev;
				this._me._length--;
			} else if ( isN ) {
				this._me.removeFirst();
			} else {
				this._me.removeLast();
			}
		}
	}
};
//Array�I�u�W�F�N�g�ɕϊ�����
LinkedList.prototype.toArray = function() {
	var result = [];
	this.forEach(function(e){result.push(e);});
	return result;
};
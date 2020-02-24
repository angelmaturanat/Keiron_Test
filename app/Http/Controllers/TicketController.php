<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

use App\Ticket;

use Auth;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = JWTAuth::parseToken()->authenticate();

        if($user->tipo_user_id == 1){
            return Ticket::with('user')->with('asignado')->get();
        }else if($user->tipo_user_id == 2){
            return Ticket::with('user')->with('asignado')->where('assigned_user_id', Auth::id())->get();
        }
    }

    public function indexOwnTickets()
    {
        $user = JWTAuth::parseToken()->authenticate();
        
        if($user->tipo_user_id == 2){
            return Ticket::with('user')->with('asignado')->where('owner_user_id', $user->id)->get();
        }else{
            return [];
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'ticket_pedido' => 'required',
        ]);

        $user = JWTAuth::parseToken()->authenticate();

        $ticket = new Ticket;
        $ticket->owner_user_id = $user->id;
        $ticket->ticket_pedido = $request->ticket_pedido;

        if($ticket->save()){
            return response()->json([
                'error' => false,
                'customer'  => $ticket,
            ], 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Ticket::where('id', $id)->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        return Ticket::where('id', $id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

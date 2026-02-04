// /workspaces/auto/auto/types/supabase.ts

export type Database = {
  public: {
    Tables: {
      roles: {
        Row: {
          id: number;
          role_name: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          role_name: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          role_name?: string;
          description?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fk";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_roles: {
        Row: {
          id: number;
          user_id: string;
          role_id: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          role_id: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          role_id?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fk";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          }
        ];
      };
      slack_events: {
        Row: {
          id: number;
          event_type: string | null;
          text: string | null;
          user_id: string | null;
          channel: string | null;
          ts: string | null;
          full_event: Record<string, any> | null;
          inserted_at: string;
        };
        Insert: {
          id?: number;
          event_type?: string | null;
          text?: string | null;
          user_id?: string | null;
          channel?: string | null;
          ts?: string | null;
          full_event?: Record<string, any> | null;
          inserted_at?: string;
        };
        Update: {
          id?: number;
          event_type?: string | null;
          text?: string | null;
          user_id?: string | null;
          channel?: string | null;
          ts?: string | null;
          full_event?: Record<string, any> | null;
          inserted_at?: string;
        };
        Relationships: [];
      };
      observations: {
        Row: {
          id: number;
          title: string | null;
          description: string | null;
          category_id: number | null;
          type_id: number | null;
          location: string | null;
          reporter_id: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title?: string | null;
          description?: string | null;
          category_id?: number | null;
          type_id?: number | null;
          location?: string | null;
          reporter_id?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string | null;
          description?: string | null;
          category_id?: number | null;
          type_id?: number | null;
          location?: string | null;
          reporter_id?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "observations_category_id_fk";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "observation_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "observations_type_id_fk";
            columns: ["type_id"];
            isOneToOne: false;
            referencedRelation: "observation_types";
            referencedColumns: ["id"];
          }
        ];
      };
      observation_categories: {
        Row: {
          id: number;
          category_name: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          category_name: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          category_name?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      observation_types: {
        Row: {
          id: number;
          type_name: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          type_name: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          type_name?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          assigned_to: string | null;
          status: string;
          due_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          assigned_to?: string | null;
          status?: string;
          due_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          assigned_to?: string | null;
          status?: string;
          due_date?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      audit_log: {
        Row: {
          id: number;
          user_id: string | null;
          action: string | null;
          entity: string | null;
          entity_id: number | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id?: string | null;
          action?: string | null;
          entity?: string | null;
          entity_id?: number | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string | null;
          action?: string | null;
          entity?: string | null;
          entity_id?: number | null;
          created_at?: string;
        };
        Relationships: [];
      };
      attachments: {
        Row: {
          id: number;
          observation_id: number | null;
          file_url: string | null;
          file_type: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          observation_id?: number | null;
          file_url?: string | null;
          file_type?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          observation_id?: number | null;
          file_url?: string | null;
          file_type?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "attachments_observation_id_fk";
            columns: ["observation_id"];
            isOneToOne: false;
            referencedRelation: "observations";
            referencedColumns: ["id"];
          }
        ];
      };
      ai_analysis: {
        Row: {
          id: number;
          observation_id: number | null;
          analysis: Record<string, any> | null;
          risk_score: number | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          observation_id?: number | null;
          analysis?: Record<string, any> | null;
          risk_score?: number | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          observation_id?: number | null;
          analysis?: Record<string, any> | null;
          risk_score?: number | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ai_analysis_observation_id_fk";
            columns: ["observation_id"];
            isOneToOne: false;
            referencedRelation: "observations";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};